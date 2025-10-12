import { FC } from 'react';

export const FooterBar: FC = () => {
  // Computed values
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background py-8 border-t border-border">
      <div className="container mx-auto px-6 text-center">
        <p className="text-sm text-muted-foreground">
          &copy; {currentYear} BK Hair Salon. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
};
