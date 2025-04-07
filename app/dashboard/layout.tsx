import RouteProtection from "@/components/route-protection";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RouteProtection>
      {children}
    </RouteProtection>
  );
} 