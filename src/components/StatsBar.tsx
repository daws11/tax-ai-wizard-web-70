import { useTranslation } from "react-i18next";

/** Metric band below the logo wall. */
const StatsBar = () => {
  const { t } = useTranslation();

  const stats = [
    { value: "99.9%", label: t('site.stats.accuracy') },
    { value: "40+", label: t('site.stats.hours') },
    { value: "12k+", label: t('site.stats.queries') },
    { value: "24/7", label: t('site.stats.availability') },
  ];

  return (
    <dl className="mt-16 grid grid-cols-2 gap-y-10 border-t border-slate-200 pt-12 text-center lg:grid-cols-4">
      {stats.map((s, i) => (
        <div key={i} className={`reveal flex flex-col items-center ${i === 1 ? "reveal-d1" : i === 2 ? "reveal-d2" : i === 3 ? "reveal-d3" : ""}`}>
          <dd className="order-1 text-4xl font-extrabold tracking-tight text-navy-900">{s.value}</dd>
          <dt className="order-2 mt-1.5 max-w-[220px] text-sm font-medium text-slate-500">{s.label}</dt>
        </div>
      ))}
    </dl>
  );
};

export default StatsBar;
