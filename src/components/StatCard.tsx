export interface StatCardProps {
  title: string;
  description: string;
  icon: string;
}

export function StatCard({ title, description, icon }: StatCardProps) {
  return (
    <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-lg p-6 hover:bg-opacity-20 transition-all">
      <div className="text-5xl mb-4">{icon}</div>
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-white text-opacity-75">{description}</p>
    </div>
  );
}
