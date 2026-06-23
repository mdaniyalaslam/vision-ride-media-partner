import { View, Text, StyleSheet, Platform, Alert, Share } from "react-native";
import React from "react";
import { Colors, Metrix, NavigationService } from "../config";
import TextComponent from "./TextComponent";
import Button from "./Button";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Tag from "./Tag";
import { priceFormatter, ToastSuccess } from "../config/Constants";
import { HomeMiddleware } from "../redux/Middlewares";
import { useDispatch, useSelector } from "react-redux";
import Toast from "react-native-toast-message";
import RNBlobUtil from "react-native-blob-util";
// import Share from 'react-native-share';

const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const formatAmount = (amount) => {
  return priceFormatter(amount);
};

const OrderInvoiceComponent = ({ item, isOrder = false }) => {
  const { user } = useSelector((state) => state.AuthReducer);
  const dispatch = useDispatch();

  const downloadPDF = async (base64PDF) => {
    try {
      // Define file path based on the platform
      const filePath =
        Platform.OS === "android"
          ? `${RNBlobUtil.fs.dirs.DownloadDir}/vrm_invoice.pdf`
          : `${RNBlobUtil.fs.dirs.DocumentDir}/vrm_invoice.pdf`;

      // Write the Base64 string to a file
      await RNBlobUtil.fs.writeFile(filePath, base64PDF, "base64");

      if (Platform.OS === "android") {
        // For Android, open the file directly
        await RNBlobUtil.android.actionViewIntent(filePath, "application/pdf");
        Alert.alert("Success", "PDF saved to Downloads folder.");
      } else {
        // For iOS, show the save-to-file bottom sheet
        await Share.share({
          url: `file://${filePath}`,
          title: "Save PDF",
        });
      }
    } catch (error) {
      console.error("Error downloading the PDF:", error);
      Alert.alert("Error", "Failed to download the PDF.");
    }
  };

  const downloadInvoice = () => {
    dispatch(
      HomeMiddleware.DownloadInvoice(
        user?.token,
        isOrder ? item?.invoice_id : item?.id,
      ),
    )
      .then((res) => {
        console.log("DOWNLOAD RES", res);
        if (res?.data?.pdf_base64) {
          downloadPDF(res?.data?.pdf_base64);
        } else {
          Alert.alert("Error", "Invalid PDF data received.");
        }
      })
      .catch((error) => {
        console.error("Error downloading invoice:", error);
        Alert.alert("Error", "Failed to download the invoice.");
      });
  };

  const processPayment = () => {
    dispatch(HomeMiddleware.ProcessPayment(user?.token, item?.id)).then(
      (res) => {
        console.log("PAY NOW RES", res);
        Toast.show(ToastSuccess("Payment processed successfully!"));
        NavigationService.resetStack("UserStack");
      },
    );
  };
  return (
    <>
      {isOrder ? (
        <View style={styles.card}>
          {/* Status Tag */}
          <View style={styles.tagContainer}>
            <Tag
              text={item?.status?.toUpperCase() || "N/A"}
              id={
                item?.payment_status == "pending" ||
                item?.payment_status == "unpaid"
                  ? 1
                  : item?.payment_status == "paid"
                  ? 2
                  : 3
              }
            />
          </View>

          <View style={styles.row}>
            <TextComponent
              text="Order# "
              customStyles={styles.label}
              isSubTitle
            />
            <TextComponent text={item?.invoice_number || item?.order_number} />
          </View>

          <View style={styles.row}>
            <TextComponent
              text="Item: "
              customStyles={styles.label}
              isSubTitle
            />
            <TextComponent
              customStyles={{
                width: Metrix.HorizontalSize(150),
              }}
              text={item?.product?.title + item?.product?.title}
              numberOfLines={1}
              ellipsizeMode="tail"
            />
          </View>

          <View style={styles.row}>
            <TextComponent
              text="Total: "
              customStyles={styles.label}
              isSubTitle
            />
            <TextComponent text={formatAmount(item?.total_amount)} />
          </View>

          <View style={styles.row}>
            <TextComponent
              text="Order Date:"
              customStyles={styles.label}
              isSubTitle
            />
            <TextComponent text={formatDate(item?.created_at)} />
          </View>

          <Button
            title="View order details"
            buttonStyle={{ height: 40, marginTop: 6 }}
            onPress={() => NavigationService.navigate("OrderDetails", { item })}
          />
        </View>
      ) : (
        <View style={styles.card}>
          {/* Status Tag */}
          <View style={styles.tagContainer}>
            <Tag
              text={item?.payment_status?.toUpperCase() || "N/A"}
              id={
                item?.payment_status == "pending" ||
                item?.payment_status == "unpaid"
                  ? 1
                  : item?.payment_status == "paid"
                  ? 2
                  : 3
              }
            />
          </View>

          <View style={styles.row}>
            <TextComponent
              text="Invoice# "
              customStyles={styles.label}
              isSubTitle
            />
            <TextComponent text={item?.invoice_number || item?.order_number} />
          </View>

          <View style={styles.row}>
            <TextComponent
              text="Bid Amount: "
              customStyles={styles.label}
              isSubTitle
            />
            <TextComponent
              text={formatAmount(item?.bid?.bid_amount || item?.amount)}
            />
          </View>

          <View style={styles.row}>
            <TextComponent
              text="Tax: "
              customStyles={styles.label}
              isSubTitle
            />
            <TextComponent text={formatAmount(item?.tax)} />
          </View>

          <View style={styles.row}>
            <TextComponent
              text="Total: "
              customStyles={styles.label}
              isSubTitle
            />
            <TextComponent text={formatAmount(item?.total_amount)} />
          </View>

          <View style={styles.row}>
            <TextComponent
              text="Issue Date: "
              customStyles={styles.label}
              isSubTitle
            />
            <TextComponent text={formatDate(item?.issue_date)} />
          </View>
          <View style={styles.row}>
            <TextComponent
              text="Due Date: "
              customStyles={styles.label}
              isSubTitle
            />
            <TextComponent text={formatDate(item?.due_date)} />
          </View>

          {item?.paid_at && (
            <View style={styles.row}>
              <TextComponent
                text="Paid At: "
                customStyles={styles.label}
                isSubTitle
              />
              <TextComponent text={formatDate(item?.paid_at)} />
            </View>
          )}

          {item?.payment_status === "pending" ? (
            <View
              style={
                {
                  // flexDirection: 'row',
                  // flex: 1,
                  // justifyContent: 'space-between',
                }
              }
            >
              <Button
                preIcon={
                  <MaterialIcons
                    name={"payment"}
                    color={Colors.white}
                    size={20}
                  />
                }
                title="Pay Now"
                buttonStyle={{ height: 40, marginTop: 6 }}
                onPress={processPayment}
              />
              {/* <Button
            preIcon={
              <MaterialIcons name={'download'} color={Colors.white} size={20} />
            }
            title="Download"
            buttonStyle={{ height: 40, marginTop: 6, width: '48%' }}
            onPress={downloadInvoice}
          /> */}
            </View>
          ) : (
            <Button
              preIcon={
                <MaterialIcons
                  name={"download"}
                  color={Colors.white}
                  size={20}
                />
              }
              title="Download"
              buttonStyle={{ height: 40, marginTop: 6 }}
              onPress={downloadInvoice}
            />
          )}
        </View>
      )}
    </>
  );
};

export default OrderInvoiceComponent;

const styles = StyleSheet.create({
  card: {
    margin: 5,
    borderRadius: 8,
    padding: 10,
    borderColor: Colors.primary,
    borderWidth: 0.5,
  },
  tagContainer: {
    position: "absolute",
    right: 10,
    top: 10,
  },
  row: {
    flexDirection: "row",
    marginBottom: 6,
    alignItems: "center",
  },
  label: {
    width: Metrix.HorizontalSize(80),
  },
});
