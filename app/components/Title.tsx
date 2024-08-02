interface TitleProps {
  text: string;
}

export default function Title({ text }: TitleProps) {
  return (
    <div className={`flex justify-start mb-4`}>
      <h1 className={`text-3xl`}>{text}</h1>
    </div>
  );
}
