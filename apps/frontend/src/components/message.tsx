import clsx from 'clsx';
import type { ChatMessage } from '@/hooks/useChat';

type MessageProps = {
  message: ChatMessage;
  nickname: string;
};

export const Message = (props: MessageProps) => {
  const { message, nickname } = props;
  const isSelf = message.nickname === nickname;

  const messageStyles = isSelf ? styles.selfMessage : styles.otherMessage;
  const messageContent = isSelf ? (
    message.text
  ) : (
    <>
      <span className={clsx(styles.nickname)}>{message.nickname}</span>
      {message.text}
    </>
  );

  return (
    <div className={clsx(styles.messageWrapper)}>
      <div
        className={clsx(messageStyles)}
        key={`${message.nickname}-${message.text}-${message.timestamp ?? ''}`}
      >
        {messageContent}
      </div>
    </div>
  );
};

const styles = {
  messageWrapper: ['flex w-full'],
  otherMessage: [
    'text-sm flex flex-col p-2 bg-coal-relic/40 rounded-lg backdrop-blur-xl w-fit max-w-[80%]',
  ],
  selfMessage: [
    'text-sm flex flex-col p-2 text-right text-moss-fog break-words',
    'whitespace-pre-wrap overflow-wrap-anywhere bg-river/30 rounded-lg backdrop-blur-xl w-fit max-w-[80%] ml-auto',
  ],
  nickname: ['font-display font-semibold text-moss/80 mr-2 uppercase'],
};
