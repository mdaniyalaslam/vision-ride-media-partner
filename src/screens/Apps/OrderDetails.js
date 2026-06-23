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

// ─── Helpers ─────────────────────────────────────────────────────────────────

const monthYear = (d) => {
  if (!d) return "";
  const dt = new Date(d);
  if (isNaN(dt.getTime())) return "";
  return dt.toLocaleDateString("en-US", { month: "long", year: "numeric" });
};

const formatDate = (d) => {
  if (!d) return "—";
  const dt = new Date(d);
  if (isNaN(dt.getTime())) return String(d);
  return dt.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

// ─── Shared rows ─────────────────────────────────────────────────────────────

const InfoRow = ({ label, value, isLast = false }) => (
  <View style={[styles.infoRow, !isLast && styles.infoRowBorder]}>
    <Text style={styles.infoLabel}>{label}</Text>
    <Text style={styles.infoValue}>{value ?? "—"}</Text>
  </View>
);

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
  const item = route?.params?.order ?? {};
  const vehicle = item?.vehicle ?? {};
  const campaign = item?.campaign ?? {};
  const advertiser = campaign?.advertiser ?? {};

  const orders = Array.isArray(item?.orders) ? item.orders : [];
  const order = orders[orders.length - 1] ?? null;

  // Reflects a report submitted during this session without a full refetch
  const [hasOrder, setHasOrder] = useState(!!order);

  const orderNumber = order?.order_number ?? String(item?.id ?? "—");
  const period = monthYear(order?.order_date ?? item?.created_at);
  const reportState = hasOrder ? "Submitted" : "Pending";
  const overallStatus = hasOrder ? "Active" : "Pending";
  const reportsCount = hasOrder
    ? Math.max(item?.orders_count ?? orders.length, 1)
    : item?.orders_count ?? orders.length;

  const vehicleName =
    `${vehicle?.make ?? ""} ${vehicle?.model ?? ""}`.trim() || "—";

  const handleAddReport = () => {
    NavigationService.navigate("AddMonthlyMileage", {
      orderId: item?.id,
      onSubmitted: () => setHasOrder(true),
    });
  };

  return (
    <>
      <Header backIcon={true} title="Order Details" notificationIcon={false} />
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Order ── */}
        <Section title="Order Information">
          <View style={[styles.infoRow, styles.infoRowBorder]}>
            <Text style={styles.infoLabel}>Status</Text>
            <Tag text={overallStatus} id={hasOrder ? 2 : 1} />
          </View>
          <InfoRow label="Order Number" value={orderNumber} />
          <InfoRow
            label="Order Date"
            value={order?.order_date ? formatDate(order.order_date) : "N/A"}
          />
          <InfoRow
            label="Monthly Amount"
            value={
              order?.monthly_original_price
                ? `$${order.monthly_original_price}`
                : "—"
            }
            isLast
          />
        </Section>

        {/* ── Campaign ── */}
        <Section title="Campaign">
          <InfoRow label="City" value={campaign?.city} />
          <InfoRow
            label="Duration"
            value={
              campaign?.campaign_length
                ? `${campaign.campaign_length} months`
                : "—"
            }
          />
          <InfoRow
            label="Started"
            value={
              campaign?.created_at ? formatDate(campaign.created_at) : "—"
            }
            isLast
          />
        </Section>

        {/* ── Vehicle ── */}
        <Section title="Vehicle">
          <InfoRow label="Vehicle" value={vehicleName} />
          <InfoRow
            label="Registration"
            value={vehicle?.registration_number}
          />
          <InfoRow label="VIN" value={vehicle?.vin} />
          <InfoRow label="Year" value={vehicle?.year} isLast />
        </Section>

        {/* ── Advertiser ── */}
        <Section title="Advertiser">
          <InfoRow
            label="Company"
            value={advertiser?.company_name}
            isLast
          />
        </Section>

        {/* ── Monthly Reports ── */}
        <Section title="Monthly Reports">
          <View style={[styles.infoRow, styles.infoRowBorder]}>
            <Text style={styles.infoLabel}>This Month</Text>
            <View style={styles.reportState}>
              <Ionicons
                name={hasOrder ? "checkmark-circle" : "time-outline"}
                size={Metrix.customFontSize(16)}
                color={hasOrder ? Colors.greenDark : Colors.pending}
              />
              <Text style={styles.reportStateText}>
                {`${reportState}${period ? ` for ${period}` : ""}`}
              </Text>
            </View>
          </View>
          <InfoRow
            label="Total Reports"
            value={`${reportsCount} ${reportsCount === 1 ? "report" : "reports"}`}
            isLast
          />
        </Section>

        {/* ── Action ── */}
        {hasOrder ? (
          <View style={styles.submittedBtn}>
            <Ionicons
              name="checkmark-done"
              size={Metrix.customFontSize(18)}
              color={Colors.white}
              style={{ marginRight: 6 }}
            />
            <Text style={styles.submittedText}>Already Submitted</Text>
          </View>
        ) : (
          <Button
            title="Add Monthly Mileage & Images"
            onPress={handleAddReport}
            buttonStyle={styles.actionBtn}
            preIcon={
              <Ionicons
                name="add"
                size={Metrix.customFontSize(20)}
                color={Colors.white}
                style={{ marginRight: 6 }}
              />
            }
          />
        )}
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
  reportState: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  reportStateText: {
    fontFamily: fonts.SemiBold,
    fontSize: Metrix.customFontSize(12),
    color: Colors.textColor,
  },
  actionBtn: {
    width: "100%",
    height: Metrix.VerticalSize(52),
    borderRadius: 10,
    marginTop: Metrix.VerticalSize(8),
  },
  submittedBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: Metrix.VerticalSize(52),
    borderRadius: 10,
    marginTop: Metrix.VerticalSize(8),
    backgroundColor: Colors.greenDark,
  },
  submittedText: {
    fontFamily: fonts.Bold,
    fontSize: Metrix.customFontSize(14),
    color: Colors.white,
  },
});
