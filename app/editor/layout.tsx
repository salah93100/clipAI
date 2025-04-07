import RouteProtection from "@/components/route-protection";

export default function EditorLayout({
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