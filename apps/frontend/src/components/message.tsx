import clsx from 'clsx';
import type { ChatMessage } from '@/features/radio/hooks/useChat';

type MessageProps = {
  message: ChatMessage;
  nickname: string;
};

export const Message = (props: MessageProps) => {
  const { message, nickname } = props;
  const isSelf = message.nickname === nickname;
  const displayNickname = message.nickname || 'Анонім';

  const messageStyles = isSelf ? styles.selfMessage : styles.otherMessage;
  const messageContent = isSelf ? (
    message.text
  ) : (
    <>
      <span className={clsx(styles.nickname)}>{displayNickname}</span>
      {message.text}
    </>
  );

  return (
    <div className={clsx(styles.messageWrapper)}>
      <div
        className={clsx(styles.message, messageStyles)}
        key={`${message.nickname}-${message.text}-${message.timestamp ?? ''}`}
      >
        {messageContent}
      </div>
    </div>
  );
};

const styles = {
  messageWrapper: ['flex w-full'],
  message: [
    'flex flex-col text-sm p-2 break-words',
    'whitespace-pre-wrap overflow-wrap-anywhere bg-coal-relic/40 rounded-lg',
    'backdrop-blur-xl w-fit max-w-[90%] md:max-w-[80%]',
  ],
  otherMessage: ['bg-coal-relic/40 text-moss-fog text-left'],
  selfMessage: ['bg-river/30 text-moss-fog ml-auto text-right'],
  nickname: ['font-display font-semibold text-moss/80 mr-2 uppercase'],
};
