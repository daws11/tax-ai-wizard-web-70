import { useTranslation } from "react-i18next";

/**
 * Static (non-rotating) client logo wall. Text wordmarks styled as
 * monochrome logos — swap for the real PNGs in public/lovable-uploads
 * if brand assets become available.
 */
const LogoWall = () => {
  const { t } = useTranslation();

  const logos = [
    <span className="text-sm font-bold tracking-tight" key="adpolice">ABU DHABI POLICE</span>,
    <span className="font-serif text-xl font-bold italic" key="adcb">ADCB</span>,
    <span className="text-[13px] font-semibold leading-tight text-center" key="ea">Environment Agency<br />Abu Dhabi</span>,
    <span className="text-base font-extrabold tracking-wide" key="alhilal">AL HILAL BANK</span>,
    <span className="text-sm font-bold tracking-tight" key="sfc">SFC</span>,
    <span className="text-xl font-extrabold lowercase tracking-tight" key="stc">stc</span>,
  ];

  return (
    <ul className="mt-8 grid grid-cols-2 items-center justify-items-center gap-x-8 gap-y-6 text-slate-400 sm:grid-cols-3 lg:grid-cols-6" aria-label={t('site.logos.title')}>
      {logos.map((logo, i) => (
        <li key={i}>{logo}</li>
      ))}
    </ul>
  );
};

export default LogoWall;
