import Image from 'next/image';

interface Props {
  avatarUrl: string;
  onClick?: () => void;
}
export default function Avatar({ avatarUrl, onClick }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        background: 'none',
        border: 'none',
        padding: 0,
        cursor: 'pointer',
        borderRadius: '50%',
        overflow: 'hidden',
        width: 36,
        height: 36,
        marginLeft: 8,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Image src={avatarUrl} alt="Profile" width={36} height={36} style={{ objectFit: 'cover', borderRadius: '50%' }} />
    </button>
  );
}
