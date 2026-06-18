import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Platform,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Colors, Metrix } from "../../config";
import { Header, TextComponent, TextField } from "../../components";
import NotificationItemComponent from "../../components/NotificationItemComponent";
import { fonts } from "../../config/Constants";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useDispatch, useSelector } from "react-redux";
import { HomeMiddleware } from "../../redux/Middlewares";
import ImageCropPicker from "react-native-image-crop-picker";
import Toast from "react-native-toast-message";

const MAX_ATTACHMENTS = 5;

const Support = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.AuthReducer);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [attachments, setAttachments] = useState([]);
  const lastMessageIdRef = useRef(0);

  useEffect(() => {
    loadMessages();
  }, []);

  useEffect(() => {
    const interval = setInterval(pollNewMessages, 20000);
    return () => clearInterval(interval);
  }, [user?.token]);

  const loadMessages = () => {
    dispatch(HomeMiddleware.GetMessages(user?.token)).then((res) => {
      const msgs = res?.data?.messages || [];
      setMessages([...msgs].reverse());
      if (msgs.length > 0) {
        lastMessageIdRef.current = msgs[msgs.length - 1].id;
        markAllRead(msgs);
      }
    });
  };

  const markAllRead = (msgs) => {
    const ids = msgs.map((m) => m.id).filter((id) => id != null);
    if (ids.length > 0) {
      dispatch(
        HomeMiddleware.MarkMessagesRead(user?.token, { message_ids: ids }),
      );
    }
  };

  const pollNewMessages = () => {
    dispatch(HomeMiddleware.PollMessages(user?.token, lastMessageIdRef.current))
      .then((res) => {
        const newMsgs = res?.data?.messages || [];
        if (newMsgs.length > 0) {
          lastMessageIdRef.current = newMsgs[newMsgs.length - 1].id;
          setMessages((prev) => [...newMsgs, ...prev]);
          markAllRead(newMsgs);
        }
      })
      .catch(() => {});
  };

  const sendMessage = () => {
    if (!message.trim() && attachments.length === 0) return;

    const formData = new FormData();
    if (message.trim()) {
      formData.append("content", message.trim());
    }
    attachments.forEach((file) => {
      formData.append("attachments[]", {
        uri: file.uri,
        type: file.mime || "image/jpeg",
        name: file.name,
      });
    });

    dispatch(HomeMiddleware.SendMessage(user?.token, formData)).then(() => {
      setMessage("");
      setAttachments([]);
      loadMessages();
    });
  };

  const pickAttachments = () => {
    if (attachments.length >= MAX_ATTACHMENTS) {
      Toast.show({
        type: "error",
        text1: `Max ${MAX_ATTACHMENTS} attachments allowed`,
      });
      return;
    }
    ImageCropPicker.openPicker({
      multiple: true,
      maxFiles: MAX_ATTACHMENTS - attachments.length,
      cropping: false,
    })
      .then((images) => {
        const picked = images.map((img) => ({
          id: Math.random().toString(),
          uri: img.path,
          mime: img.mime,
          name: `attachment_${Date.now()}_${Math.floor(
            Math.random() * 1000,
          )}.jpg`,
        }));
        setAttachments((prev) =>
          [...prev, ...picked].slice(0, MAX_ATTACHMENTS),
        );
      })
      .catch(() => {});
  };

  const removeAttachment = (id) => {
    setAttachments((prev) => prev.filter((a) => a.id !== id));
  };

  const deleteMessage = (id) => {
    dispatch(HomeMiddleware.DeleteMessage(user?.token, id)).then(() => {
      setMessages((prev) => prev.filter((m) => m.id !== id));
    });
  };

  return (
    <View style={styles.container}>
      <Header backIcon={true} title={"Conversation"} />

      <FlatList
        inverted
        showsVerticalScrollIndicator={false}
        data={messages}
        onEndReachedThreshold={0.7}
        ListEmptyComponent={() => (
          <View
            style={{
              transform: [{ scaleY: -1 }],
              height: 500,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TextComponent
              customStyles={{
                ...styles.noData,
                transform: [{ scaleX: Platform.OS === "ios" ? 1 : -1 }],
              }}
              text="No messages"
            />
          </View>
        )}
        ListFooterComponent={() => (
          <View style={{ height: Metrix.HorizontalSize(20) }} />
        )}
        renderItem={({ item, index }) => (
          <NotificationItemComponent
            item={item}
            index={index}
            token={user?.token}
            onDelete={deleteMessage}
            customStyles={{
              maxWidth: "80%",
              alignSelf:
                item?.sender_type === "user" ? "flex-end" : "flex-start",
            }}
          />
        )}
        keyExtractor={(item) => String(item.id)}
      />

      {attachments.length > 0 && (
        <View style={styles.attachmentPreviewRow}>
          {attachments.map((file) => (
            <View key={file.id} style={styles.attachmentPreview}>
              <Image source={{ uri: file.uri }} style={styles.previewThumb} />
              <TouchableOpacity
                style={styles.removeBtn}
                onPress={() => removeAttachment(file.id)}
              >
                <MaterialIcons
                  name="close"
                  size={14}
                  color={Colors.white || "#fff"}
                />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      )}

      <View style={styles.inputRow}>
        <TouchableOpacity onPress={pickAttachments} style={styles.attachBtn}>
          <MaterialIcons
            name="attach-file"
            color={
              attachments.length >= MAX_ATTACHMENTS
                ? Colors.darkGray
                : Colors.primary
            }
            size={24}
          />
        </TouchableOpacity>
        <TextField
          value={message}
          inputContainerStyle={styles.textField}
          inputStyle={{ paddingTop: 10 }}
          multiline={true}
          onChangeText={(t) => setMessage(t)}
        />
        <TouchableOpacity onPress={sendMessage}>
          <MaterialIcons
            name="send"
            color={
              message.trim() || attachments.length > 0
                ? Colors.primary
                : Colors.darkGray
            }
            size={26}
            style={{ marginLeft: 8 }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Support;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  noData: {
    fontSize: Metrix.customFontSize(14),
    fontFamily: fonts.Bold,
    color: Colors.darkGray,
    textAlign: "center",
  },
  inputRow: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  attachBtn: {
    marginRight: 6,
    padding: 4,
  },
  textField: {
    flex: 1,
  },
  attachmentPreviewRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 16,
    paddingTop: 8,
    gap: 8,
  },
  attachmentPreview: {
    position: "relative",
  },
  previewThumb: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  removeBtn: {
    position: "absolute",
    top: -6,
    right: -6,
    backgroundColor: Colors.primary,
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});
