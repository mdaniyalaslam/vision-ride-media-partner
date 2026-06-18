import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  Modal,
  Alert,
  Dimensions,
  StatusBar,
} from "react-native";
import React, { useState } from "react";
import FastImage from "react-native-fast-image";
import { Colors, Metrix } from "../config";
import { fonts } from "../config/Constants";
import TextComponent from "./TextComponent";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import moment from "moment";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const ImageViewer = ({ visible, uri, token, onClose }) => (
  <Modal
    visible={visible}
    transparent
    animationType="fade"
    statusBarTranslucent
    onRequestClose={onClose}
  >
    <View style={styles.modalOverlay}>
      <TouchableOpacity
        style={styles.modalCloseBtn}
        onPress={onClose}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <MaterialIcons name="close" size={26} color="#fff" />
      </TouchableOpacity>
      <FastImage
        source={{
          uri,
          headers: token ? { Authorization: `Bearer ${token}` } : {},
          priority: FastImage.priority.high,
        }}
        style={styles.fullImage}
        resizeMode={FastImage.resizeMode.contain}
      />
    </View>
  </Modal>
);

// Renders image directly in the bubble; tap expands to full-screen
const AttachmentItem = ({ attachment, token, onPress }) => {
  const isImage = attachment?.is_image === true;
  const uri =
    attachment?.file_path || attachment?.url || attachment?.path || "";

  if (isImage) {
    return (
      <TouchableOpacity
        onPress={() => onPress?.(uri)}
        activeOpacity={0.9}
        style={styles.inlineImageWrapper}
      >
        <FastImage
          source={{
            uri,
            headers: token ? { Authorization: `Bearer ${token}` } : {},
            priority: FastImage.priority.normal,
          }}
          style={styles.inlineImage}
          resizeMode={FastImage.resizeMode.cover}
        />
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.attachmentFile}>
      <MaterialIcons
        name="insert-drive-file"
        size={18}
        color={Colors.primary}
      />
      <Text style={styles.attachmentFileName} numberOfLines={1}>
        {attachment?.filename || "attachment"}
      </Text>
    </View>
  );
};

const NotificationItemComponent = ({ item, customStyles, token, onDelete }) => {
  const [viewerUri, setViewerUri] = useState(null);

  const isOwn = item?.sender_type === "user";
  const text = item?.content || item?.message;
  // Handle multiple possible field names the API might use for attachments
  const attachments = item?.attachments || item?.files || item?.media || [];
  if (__DEV__)
    console.log(
      "[MSG]",
      JSON.stringify({
        id: item?.id,
        attachments_raw: item?.attachments,
        files_raw: item?.files,
        media_raw: item?.media,
      }),
    );

  const handleLongPress = () => {
    if (!isOwn || !onDelete) return;
    Alert.alert("Delete Message", "Delete this message?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => onDelete(item.id),
      },
    ]);
  };

  return (
    <View>
      {/* Plain View — no touchable wrapper, eliminates all nested-touch conflicts */}
      <View style={[styles.itemContainer, customStyles]}>
        {!!text && <TextComponent customStyles={styles.itemName} text={text} />}
        {attachments.length > 0 && (
          <View style={styles.attachmentsCol}>
            {attachments.map((att) => (
              <AttachmentItem
                key={att.id}
                attachment={att}
                token={token}
                onPress={setViewerUri}
              />
            ))}
          </View>
        )}
        {/* Long-press only on the timestamp row to delete own messages */}
        <Pressable onLongPress={handleLongPress}>
          <TextComponent
            customStyles={styles.status}
            text={moment(item?.created_at).format("DD MMM, hh:mm A") || "N/A"}
          />
        </Pressable>
      </View>

      <ImageViewer
        visible={!!viewerUri}
        uri={viewerUri || ""}
        token={token}
        onClose={() => setViewerUri(null)}
      />
    </View>
  );
};

export default NotificationItemComponent;

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: Colors.grayBackground,
    borderRadius: 16,
    marginTop: Metrix.VerticalSize(16),
    paddingVertical: Metrix.VerticalSize(10),
    paddingHorizontal: 10,
    marginHorizontal: Metrix.HorizontalSize(20),
  },
  itemName: {
    fontSize: Metrix.customFontSize(12),
    fontFamily: fonts.Medium,
    color: Colors.black,
  },
  status: {
    color: Colors.darkGray,
    paddingTop: 6,
    textAlign: "right",
  },
  attachmentsCol: {
    marginTop: 6,
    gap: 6,
  },
  inlineImageWrapper: {
    borderRadius: 10,
    overflow: "hidden",
    alignSelf: "flex-start",
  },
  inlineImage: {
    width: SCREEN_WIDTH * 0.55,
    height: SCREEN_WIDTH * 0.42,
    borderRadius: 10,
  },
  attachmentFile: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.white || "#fff",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 7,
    gap: 6,
    alignSelf: "flex-start",
  },
  attachmentFileName: {
    fontSize: 12,
    color: Colors.primary,
    fontFamily: fonts.Medium,
    maxWidth: 160,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.93)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalCloseBtn: {
    position: "absolute",
    top: (StatusBar.currentHeight || 44) + 8,
    right: 16,
    zIndex: 10,
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 20,
    padding: 6,
  },
  fullImage: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT * 0.75,
  },
});
