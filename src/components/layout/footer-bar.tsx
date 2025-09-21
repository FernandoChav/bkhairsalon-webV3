import { FC } from 'react';

export const FooterBar: FC = () => {
  return (
    <footer className="bg-background py-8 border-t border-border">
      <div className="container mx-auto px-6 text-center">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} BK Hair Salon. Todos los derechos
          reservados.
        </p>
      </div>
    </footer>
  );
};
