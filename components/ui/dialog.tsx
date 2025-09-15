import * as React from "react";

export function Dialog({
  open,
  onOpenChange,
  children,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}) {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40"
      onClick={() => onOpenChange(false)}
    >
      <div
        className="bg-white rounded-lg shadow-lg p-6 min-w-[300px]"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}

export function DialogTrigger({
  asChild,
  children,
}: {
  asChild?: boolean;
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

export function DialogContent({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

export function DialogHeader({ children }: { children: React.ReactNode }) {
  return <div className="font-bold text-lg mb-2">{children}</div>;
}

export function DialogFooter({ children }: { children: React.ReactNode }) {
  return <div className="mt-4 flex justify-end">{children}</div>;
}
