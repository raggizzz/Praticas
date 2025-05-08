import { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity, 
  TextInput, 
  KeyboardAvoidingView, 
  Platform 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, Send } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { getChats, sendMessage } from '@/services/chatService';
import { Chat } from '@/types/chat';
import { useAuth } from '@/context/AuthContext';
import ChatItem from '@/components/chat/ChatItem';
import MessageList from '@/components/chat/MessageList';

export default function ChatScreen() {
  const { user } = useAuth();
  const [chats, setChats] = useState<Chat[]>([]);
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [message, setMessage] = useState('');
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    // Fetch chats
    const loadChats = async () => {
      try {
        const data = await getChats();
        setChats(data);
      } catch (error) {
        console.error('Error loading chats:', error);
      }
    };

    loadChats();
  }, []);

  const filteredChats = searchText.length > 0
    ? chats.filter(chat => 
        chat.name.toLowerCase().includes(searchText.toLowerCase())
      )
    : chats;

  const handleSendMessage = async () => {
    if (!message.trim() || !selectedChat) return;

    try {
      await sendMessage({
        chatId: selectedChat.id,
        text: message,
        senderId: user?.id || '',
      });
      
      // Update the UI (in a real app, you'd also update the messages state)
      setMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {!selectedChat ? (
        // Chats list view
        <View style={styles.chatListContainer}>
          <Text style={styles.title}>Mensagens</Text>
          
          <View style={styles.searchContainer}>
            <Search size={20} color={colors.neutral[400]} />
            <TextInput
              style={styles.searchInput}
              placeholder="Buscar conversa"
              value={searchText}
              onChangeText={setSearchText}
              placeholderTextColor={colors.neutral[400]}
            />
          </View>
          
          <FlatList
            data={filteredChats}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <ChatItem 
                chat={item} 
                onPress={() => setSelectedChat(item)} 
              />
            )}
            contentContainerStyle={styles.chatList}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>
                  {searchText 
                    ? 'Nenhuma conversa encontrada' 
                    : 'Nenhuma conversa disponível'}
                </Text>
              </View>
            }
          />
        </View>
      ) : (
        // Chat detail view
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.chatDetailContainer}
        >
          <View style={styles.chatHeader}>
            <TouchableOpacity 
              style={styles.backButton}
              onPress={() => setSelectedChat(null)}
            >
              <Text style={styles.backButtonText}>←</Text>
            </TouchableOpacity>
            <Text style={styles.chatName}>{selectedChat.name}</Text>
          </View>
          
          <MessageList chatId={selectedChat.id} />
          
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.messageInput}
              placeholder="Digite sua mensagem..."
              value={message}
              onChangeText={setMessage}
              multiline
            />
            <TouchableOpacity 
              style={styles.sendButton}
              onPress={handleSendMessage}
              disabled={!message.trim()}
            >
              <Send size={20} color={colors.white} />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  chatListContainer: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.neutral[800],
    marginBottom: 16,
    fontFamily: 'Poppins-Bold',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.neutral[100],
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 14,
    color: colors.neutral[800],
    fontFamily: 'Poppins-Regular',
  },
  chatList: {
    paddingBottom: 20,
  },
  emptyContainer: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: colors.neutral[500],
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
  },
  chatDetailContainer: {
    flex: 1,
  },
  chatHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral[200],
  },
  backButton: {
    marginRight: 16,
  },
  backButtonText: {
    fontSize: 24,
    color: colors.primary[500],
  },
  chatName: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.neutral[800],
    fontFamily: 'Poppins-Medium',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: colors.neutral[200],
    backgroundColor: colors.white,
    alignItems: 'flex-end',
  },
  messageInput: {
    flex: 1,
    backgroundColor: colors.neutral[100],
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 10,
    maxHeight: 100,
    fontSize: 14,
    color: colors.neutral[800],
    fontFamily: 'Poppins-Regular',
  },
  sendButton: {
    backgroundColor: colors.primary[500],
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
});