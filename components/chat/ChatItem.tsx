import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { colors } from '@/constants/colors';
import { Chat } from '@/types/chat';

type ChatItemProps = {
  chat: Chat;
  onPress: () => void;
};

export default function ChatItem({ chat, onPress }: ChatItemProps) {
  // Format time to display as HH:MM or Yesterday or DD/MM
  const formatMessageTime = (dateString: string) => {
    const now = new Date();
    const messageDate = new Date(dateString);
    
    // Check if message is from today
    if (
      messageDate.getDate() === now.getDate() &&
      messageDate.getMonth() === now.getMonth() &&
      messageDate.getFullYear() === now.getFullYear()
    ) {
      return messageDate.toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
      });
    }
    
    // Check if message is from yesterday
    const yesterday = new Date(now);
    yesterday.setDate(now.getDate() - 1);
    if (
      messageDate.getDate() === yesterday.getDate() &&
      messageDate.getMonth() === yesterday.getMonth() &&
      messageDate.getFullYear() === yesterday.getFullYear()
    ) {
      return 'Ontem';
    }
    
    // Otherwise return the date
    return messageDate.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
    });
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.avatarContainer}>
        <Image 
          source={{ uri: chat.avatarUrl || 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg' }} 
          style={styles.avatar} 
        />
        {chat.online && <View style={styles.onlineIndicator} />}
      </View>
      
      <View style={styles.contentContainer}>
        <View style={styles.header}>
          <Text style={styles.name}>{chat.name}</Text>
          <Text style={styles.time}>{formatMessageTime(chat.lastMessageTime)}</Text>
        </View>
        
        <View style={styles.messageContainer}>
          <Text style={styles.message} numberOfLines={1}>{chat.lastMessage}</Text>
          {chat.unreadCount > 0 && (
            <View style={styles.unreadBadge}>
              <Text style={styles.unreadCount}>{chat.unreadCount}</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral[100],
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 12,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.success[500],
    borderWidth: 1.5,
    borderColor: colors.white,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.neutral[800],
    fontFamily: 'Poppins-Medium',
  },
  time: {
    fontSize: 12,
    color: colors.neutral[500],
    fontFamily: 'Poppins-Regular',
  },
  messageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  message: {
    flex: 1,
    fontSize: 14,
    color: colors.neutral[600],
    fontFamily: 'Poppins-Regular',
  },
  unreadBadge: {
    backgroundColor: colors.primary[500],
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 6,
    marginLeft: 8,
  },
  unreadCount: {
    fontSize: 10,
    color: colors.white,
    fontWeight: 'bold',
    fontFamily: 'Poppins-Bold',
  },
});