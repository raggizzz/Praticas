import { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { colors } from '@/constants/colors';
import { getChatMessages } from '@/services/chatService';
import { Message } from '@/types/chat';
import { useAuth } from '@/context/AuthContext';

type MessageListProps = {
  chatId: string;
};

export default function MessageList({ chatId }: MessageListProps) {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    // Fetch chat messages
    const loadMessages = async () => {
      try {
        const data = await getChatMessages(chatId);
        setMessages(data);
      } catch (error) {
        console.error('Error loading messages:', error);
      } finally {
        setLoading(false);
      }
    };

    loadMessages();
  }, [chatId]);

  // Format time to display as HH:MM
  const formatMessageTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Group messages by date
  const getMessageDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messages.length > 0 && flatListRef.current) {
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: false });
      }, 100);
    }
  }, [messages]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="small" color={colors.primary[500]} />
      </View>
    );
  }

  // Group messages by date for date separators
  let currentDate = '';

  return (
    <FlatList
      ref={flatListRef}
      data={messages}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.container}
      renderItem={({ item, index }) => {
        const isUserMessage = item.senderId === user?.id;
        const messageDate = getMessageDate(item.timestamp);
        const showDateSeparator = messageDate !== currentDate;
        
        if (showDateSeparator) {
          currentDate = messageDate;
        }
        
        return (
          <View key={item.id}>
            {showDateSeparator && (
              <View style={styles.dateSeparator}>
                <Text style={styles.dateSeparatorText}>{messageDate}</Text>
              </View>
            )}
            
            <View style={[
              styles.messageContainer,
              isUserMessage ? styles.userMessageContainer : styles.otherMessageContainer
            ]}>
              <View style={[
                styles.messageBubble,
                isUserMessage ? styles.userMessageBubble : styles.otherMessageBubble
              ]}>
                <Text style={[
                  styles.messageText,
                  isUserMessage ? styles.userMessageText : styles.otherMessageText
                ]}>
                  {item.text}
                </Text>
                <Text style={[
                  styles.messageTime,
                  isUserMessage ? styles.userMessageTime : styles.otherMessageTime
                ]}>
                  {formatMessageTime(item.timestamp)}
                </Text>
              </View>
            </View>
          </View>
        );
      }}
      ListEmptyComponent={
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Nenhuma mensagem</Text>
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateSeparator: {
    alignItems: 'center',
    marginVertical: 16,
  },
  dateSeparatorText: {
    fontSize: 12,
    color: colors.neutral[500],
    backgroundColor: colors.neutral[200],
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    fontFamily: 'Poppins-Regular',
  },
  messageContainer: {
    marginBottom: 12,
    flexDirection: 'row',
  },
  userMessageContainer: {
    justifyContent: 'flex-end',
  },
  otherMessageContainer: {
    justifyContent: 'flex-start',
  },
  messageBubble: {
    maxWidth: '75%',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  userMessageBubble: {
    backgroundColor: colors.primary[500],
    borderBottomRightRadius: 4,
  },
  otherMessageBubble: {
    backgroundColor: colors.neutral[200],
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontSize: 14,
    marginBottom: 4,
    fontFamily: 'Poppins-Regular',
  },
  userMessageText: {
    color: colors.white,
  },
  otherMessageText: {
    color: colors.neutral[800],
  },
  messageTime: {
    fontSize: 10,
    alignSelf: 'flex-end',
  },
  userMessageTime: {
    color: colors.primary[100],
  },
  otherMessageTime: {
    color: colors.neutral[500],
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyText: {
    fontSize: 14,
    color: colors.neutral[500],
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
  },
});