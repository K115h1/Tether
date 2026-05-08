import { useState } from 'react'
import { TbSend } from 'react-icons/tb'
import { useAuth } from '../components/AuthContext'


const mockConversations = [
    { id: '1', name: 'Fatima Musa', initials: 'FM', color: 'hsl(260, 60%, 48%)', lastMessage: 'See you at 2 PM tomorrow!', time: '2h ago', unread: 1 },
    { id: '2', name: 'Tunde Kehinde', initials: 'TK', color: 'hsl(310, 60%, 42%)', lastMessage: 'Thanks for the session!', time: '1d ago', unread: 0 },
    { id: '3', name: 'Adeola Okonkwo', initials: 'AO', color: 'hsl(285, 60%, 45%)', lastMessage: 'I have shared the resources.', time: '2d ago', unread: 2 },
]

export default function DashboardMessages() {
    const { user, sendMessage, markMessageRead } = useAuth()
    const [selectedChat, setSelectedChat] = useState<string | null>(null)
    const [newMessage, setNewMessage] = useState('')

    const activeConversation = mockConversations.find(c => c.id === selectedChat)
    const messages = user?.messages || []

    const handleSend = () => {
        if (!newMessage.trim() || !activeConversation) return
        sendMessage(newMessage, activeConversation.name, activeConversation.initials, activeConversation.color)
        setNewMessage('')
    }

    return (
        <div className="flex h-[calc(100vh-0px)]">
            {/* Conversations List */}
            <div className={`${selectedChat ? 'hidden md:flex' : 'flex'} flex-col w-full md:w-80 border-r border-white/[0.04] px-5 py-8`}>
                <div className="mb-8">
                    <p className="text-lime-400 text-xs font-semibold tracking-[0.25em] uppercase mb-3">Inbox</p>
                    <h1 className="text-white text-2xl font-bold">Messages</h1>
                </div>

                <div className="flex flex-col gap-2">
                    {mockConversations.map(conv => (
                        <button
                            key={conv.id}
                            onClick={() => { setSelectedChat(conv.id); markMessageRead(conv.id) }}
                            className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-200 text-left w-full ${
                                selectedChat === conv.id 
                                    ? 'bg-white/[0.06]' 
                                    : 'hover:bg-white/[0.03]'
                            }`}
                        >
                            <div className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0" style={{ background: conv.color }}>
                                {conv.initials}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between">
                                    <p className="text-white/70 text-sm font-medium truncate">{conv.name}</p>
                                    <span className="text-white/20 text-[10px] shrink-0">{conv.time}</span>
                                </div>
                                <p className="text-white/30 text-xs truncate">{conv.lastMessage}</p>
                            </div>
                            {conv.unread > 0 && (
                                <span className="w-4 h-4 rounded-full bg-lime-500 text-[9px] text-[#0E0B14] font-bold flex items-center justify-center shrink-0">
                                    {conv.unread}
                                </span>
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* Chat Area */}
            <div className={`${selectedChat ? 'flex' : 'hidden md:flex'} flex-1 flex-col`}>
                {activeConversation ? (
                    <>
                        {/* Chat Header */}
                        <div className="flex items-center gap-3 px-6 py-4 border-b border-white/[0.04]">
                            <button onClick={() => setSelectedChat(null)} className="md:hidden text-white/30 hover:text-white/60 mr-2">
                                ←
                            </button>
                            <div className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold text-white shrink-0" style={{ background: activeConversation.color }}>
                                {activeConversation.initials}
                            </div>
                            <div>
                                <p className="text-white/80 text-sm font-medium">{activeConversation.name}</p>
                                <p className="text-lime-400/60 text-[10px]">Online</p>
                            </div>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto px-6 py-4 flex flex-col gap-3">
                            <div className="self-start max-w-[70%] bg-white/[0.04] rounded-2xl rounded-tl-sm px-4 py-3">
                                <p className="text-white/60 text-sm">Hi! Looking forward to our session tomorrow.</p>
                                <span className="text-white/15 text-[10px] mt-1 block">2:30 PM</span>
                            </div>
                            <div className="self-end max-w-[70%] bg-gradient-to-r from-lime-500/20 to-amber-500/20 rounded-2xl rounded-tr-sm px-4 py-3 border border-lime-500/10">
                                <p className="text-white/80 text-sm">Me too! I have prepared some questions about React hooks.</p>
                                <span className="text-white/20 text-[10px] mt-1 block">2:32 PM</span>
                            </div>
                            <div className="self-start max-w-[70%] bg-white/[0.04] rounded-2xl rounded-tl-sm px-4 py-3">
                                <p className="text-white/60 text-sm">Perfect. See you at 2 PM tomorrow!</p>
                                <span className="text-white/15 text-[10px] mt-1 block">2:33 PM</span>
                            </div>
                            {messages.filter(m => m.sender === activeConversation.name).map(msg => (
                                <div key={msg.id} className="self-start max-w-[70%] bg-white/[0.04] rounded-2xl rounded-tl-sm px-4 py-3">
                                    <p className="text-white/60 text-sm">{msg.text}</p>
                                    <span className="text-white/15 text-[10px] mt-1 block">{msg.time}</span>
                                </div>
                            ))}
                        </div>

                        {/* Input */}
                        <div className="px-6 py-4 border-t border-white/[0.04]">
                            <div className="flex gap-3">
                                <input
                                    type="text"
                                    value={newMessage}
                                    onChange={e => setNewMessage(e.target.value)}
                                    onKeyDown={e => e.key === 'Enter' && handleSend()}
                                    placeholder="Type a message..."
                                    className="flex-1 bg-white/[0.03] border border-white/[0.07] rounded-full px-5 py-3 text-white/70 text-sm placeholder:text-white/15 focus:outline-none focus:border-lime-500/30 transition-all"
                                />
                                <button
                                    onClick={handleSend}
                                    className="w-10 h-10 rounded-full bg-gradient-to-r from-lime-500 to-amber-500 flex items-center justify-center text-[#0E0B14] hover:scale-105 transition-transform"
                                >
                                    <TbSend size={16} />
                                </button>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-center px-8">
                        <div className="w-16 h-16 rounded-full bg-white/[0.03] flex items-center justify-center mb-4">
                            <span className="text-2xl">💬</span>
                        </div>
                        <p className="text-white/30 text-sm mb-2">Select a conversation</p>
                        <p className="text-white/20 text-xs">Choose a teacher to start messaging.</p>
                    </div>
                )}
            </div>
        </div>
    )
}
