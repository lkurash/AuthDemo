import Link from "next/link";

export default function LinkBase({ label, to }) {
  return (
    <nav className="link-base">
      <Link href={to}>{label}</Link>
    </nav>
  );
}
