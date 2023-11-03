import DateFormatter from './DateFormatter';

export default function PostDate({ date }: { date: string }) {
  return (
    <div className="post-date">
      <DateFormatter dateString={date} />
      <hr />
    </div>
  );
}
