export type Message = {
  text: string;
  nickname: string;
  timestamp: string;
};

export type ChatProps = {
  nickname: string;
  setNickname: (nickname: string) => void;
};

export type ChatMessagesProps = {
  messages: Message[];
  nickname: string;
};

export type ChatInputProps = {
  onSend: (message: string) => void;
};

export type NicknameInputProps = {
  initialNickname: string;
  onSetNickname: (nickname: string) => void;
}; 
