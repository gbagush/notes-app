import type { ReactNode } from "react";

const EmptyState = ({
  icon,
  message,
  cta,
}: {
  icon: ReactNode;
  message: string;
  cta?: ReactNode;
}) => (
  <div className="flex h-full w-full flex-col items-center justify-center text-center gap-4">
    <span aria-hidden className="text-muted-foreground">
      {icon}
    </span>
    <p className="text-md text-muted-foreground text-center">{message}</p>
    {cta}
  </div>
);

export { EmptyState };
