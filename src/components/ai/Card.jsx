function Card({ title, value }) {
  return (
    <div className="rounded-3xl border border-white/10 p-6 bg-white/[0.03] hover:border-cyan-300/40 transition">
      <p className="text-gray-400 text-sm">{title}</p>

      <h3 className="text-4xl font-bold mt-4">{value}</h3>
    </div>
  );
}

export default Card;
