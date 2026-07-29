import { featureFlags } from "@/config/site";

/**
 * Oracle Partner Network branding slot.
 *
 * Gated by featureFlags.oraclePartnerApproved. While false, nothing renders
 * anywhere on the site. When approved, drop the official Oracle Partner
 * Network artwork into public/oracle-partner-network.svg and it appears here.
 */
export function OraclePartnerBadge({ className }: { className?: string }) {
  if (!featureFlags.oraclePartnerApproved) return null;

  return (
    <div className={className}>
      <img
        src="/oracle-partner-network.svg"
        alt="Oracle Partner Network member"
        width={200}
        height={64}
        loading="lazy"
        decoding="async"
        className="h-16 w-auto"
      />
    </div>
  );
}
