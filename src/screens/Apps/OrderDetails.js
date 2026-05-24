import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { Colors, Metrix, NavigationService } from "../../config";
import { Button, Header, Tag } from "../../components";
import { fonts } from "../../config/Constants";
import Ionicons from "react-native-vector-icons/Ionicons";

// ─── Shared row component ────────────────────────────────────────────────────

const InfoRow = ({ label, value, isLast = false }) => (
  <View style={[styles.infoRow, !isLast && styles.infoRowBorder]}>
    <Text style={styles.infoLabel}>{label}</Text>
    <Text style={styles.infoValue}>{value ?? "—"}</Text>
  </View>
);

// ─── Collapsible section ─────────────────────────────────────────────────────

const Section = ({ title, children, defaultOpen = true }) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <View style={styles.sectionWrapper}>
      <TouchableOpacity
        style={styles.sectionHeader}
        onPress={() => setOpen((prev) => !prev)}
        activeOpacity={0.7}
      >
        <Text style={styles.sectionTitle}>{title}</Text>
        <Ionicons
          name={open ? "chevron-up" : "chevron-down"}
          size={Metrix.customFontSize(20)}
          color={Colors.primary}
        />
      </TouchableOpacity>

      {open && <View style={styles.card}>{children}</View>}
    </View>
  );
};

// ─── Screen ──────────────────────────────────────────────────────────────────

const OrderDetails = ({ route }) => {
  const order = route?.params?.order ?? {};
  const vehicle = order?.vehicle ?? {};

  const status = order?.status ?? "Active";
  const orderId = order?.orderId ?? "";
  const orderDate = order?.orderDate ?? "";
  const corporateAdvertiser = order?.corporateAdvertiser ?? "";
  const monthlyAmount = order?.monthlyAmount ?? "";

  const make = vehicle?.make ?? "";
  const model = vehicle?.model ?? "";
  const modelCode = vehicle?.modelCode ?? "";
  const type = vehicle?.type ?? "";
  const year = vehicle?.year ?? "";
  const registrationNumber = vehicle?.registrationNumber ?? "";
  const avgMonthlyMileage = vehicle?.avgMonthlyMileage ?? "";

  return (
    <>
      <Header backIcon={true} title="Order Details" notificationIcon={false} />
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Order Information ── */}
        <Section title="Order Information">
          {/* Status badge row */}
          <View style={[styles.infoRow, styles.infoRowBorder]}>
            <Text style={styles.infoLabel}>Status</Text>
            <Tag
              text={status}
              id={
                status?.toLowerCase() === "active"
                  ? 2
                  : status?.toLowerCase() === "pending"
                  ? 1
                  : 3
              }
            />
          </View>

          <InfoRow label="Order ID" value={orderId} />
          <InfoRow label="Order Date" value={orderDate} />
          <InfoRow label="Corporate Advertiser" value={corporateAdvertiser} />
          <InfoRow
            label="Monthly Amount"
            value={monthlyAmount ? `$${monthlyAmount}` : "—"}
            isLast
          />
        </Section>

        {/* ── Vehicle Information ── */}
        <Section title="Vehicle Information">
          <InfoRow label="Make" value={make} />
          <InfoRow label="Model" value={model} />
          <InfoRow label="Model code" value={modelCode} />
          <InfoRow label="Type" value={type} />
          <InfoRow label="Year" value={year} />
          <InfoRow label="Registration Number" value={registrationNumber} />
          <InfoRow
            label="Avg. Monthly Mileage"
            value={avgMonthlyMileage ? `${avgMonthlyMileage} km` : "—"}
            isLast
          />
        </Section>

        <Button
          title="View Monthly Mileage"
          onPress={() => {
            NavigationService.navigate("MonthlyMileage");
          }}
          buttonStyle={styles.viewBtn}
        />
      </ScrollView>
    </>
  );
};

export default OrderDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  contentContainer: {
    padding: Metrix.HorizontalSize(16),
    paddingBottom: Metrix.VerticalSize(40),
  },

  // ── Section ──
  sectionWrapper: {
    marginBottom: Metrix.VerticalSize(16),
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: Metrix.VerticalSize(6),
    marginBottom: Metrix.VerticalSize(8),
  },
  sectionTitle: {
    fontFamily: fonts.Bold,
    fontSize: Metrix.customFontSize(16),
    color: Colors.primary,
  },

  // ── Card ──
  card: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    paddingHorizontal: Metrix.HorizontalSize(16),
    elevation: 2,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
  },

  // ── Row ──
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: Metrix.VerticalSize(14),
  },
  infoRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.backgroundGray,
  },
  infoLabel: {
    fontFamily: fonts.Regular,
    fontSize: Metrix.customFontSize(13),
    color: Colors.textColor,
    flex: 1,
  },
  infoValue: {
    fontFamily: fonts.Bold,
    fontSize: Metrix.customFontSize(13),
    color: Colors.primary,
    flex: 1,
    textAlign: "right",
  },

  // ── Button ──
  viewBtn: {
    width: "100%",
    height: Metrix.VerticalSize(52),
    borderRadius: 10,
    marginTop: Metrix.VerticalSize(8),
  },
});
