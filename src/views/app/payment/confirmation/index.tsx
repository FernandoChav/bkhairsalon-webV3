'use client';

import { Calendar, CheckCircle, Clock, MapPin, User } from 'lucide-react';

import { useRouter } from 'next/navigation';

import { Button } from '@/components/shadcn/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/shadcn/card';

export const PaymentConfirmationView = () => {
  const router = useRouter();

  const appointmentData = {
    service: 'Corte de cabello',
    professional: 'María González',
    date: 'Lunes, 15 de Enero',
    time: '10:30 AM',
    duration: '45 min',
    location: 'Av. Principal 123, Local 45',
    price: 15000,
    forWho: 'mi',
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-50 to-neutral-100">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-neutral-900 mb-2">
            ¡Reserva Confirmada!
          </h1>
          <p className="text-neutral-600 text-lg">
            Tu cita ha sido agendada exitosamente
          </p>
        </div>

        {/* Appointment Summary */}
        <Card className="mb-6 bg-white shadow-lg">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-xl font-semibold font-montserrat">
              Resumen de tu cita
            </CardTitle>
            <CardDescription>
              Guarda esta información para tu referencia
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3 p-3 bg-neutral-50 rounded-lg">
              <User className="w-5 h-5 text-neutral-600" />
              <div className="flex-1">
                <p className="text-sm text-neutral-600">Servicio</p>
                <p className="font-medium text-neutral-900">
                  {appointmentData.service}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-neutral-50 rounded-lg">
              <Calendar className="w-5 h-5 text-neutral-600" />
              <div className="flex-1">
                <p className="text-sm text-neutral-600">Fecha</p>
                <p className="font-medium text-neutral-900">
                  {appointmentData.date}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-neutral-50 rounded-lg">
              <Clock className="w-5 h-5 text-neutral-600" />
              <div className="flex-1">
                <p className="text-sm text-neutral-600">Horario</p>
                <p className="font-medium text-neutral-900">
                  {appointmentData.time} ({appointmentData.duration})
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-neutral-50 rounded-lg">
              <MapPin className="w-5 h-5 text-neutral-600" />
              <div className="flex-1">
                <p className="text-sm text-neutral-600">Ubicación</p>
                <p className="font-medium text-neutral-900">
                  {appointmentData.location}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-neutral-50 rounded-lg">
              <User className="w-5 h-5 text-neutral-600" />
              <div className="flex-1">
                <p className="text-sm text-neutral-600">Para</p>
                <p className="font-medium text-neutral-900">
                  {appointmentData.forWho}
                </p>
              </div>
            </div>

            <div className="border-t pt-4 mt-2">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-neutral-900">
                  Total pagado:
                </span>
                <span className="text-2xl font-bold text-green-600">
                  {formatPrice(appointmentData.price)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Important Notes */}
        <Card className="mb-6 bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <h3 className="font-semibold text-blue-900 mb-2">
              Recordatorio importante
            </h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Por favor llega 10 minutos antes de tu hora agendada</li>
              <li>• Trae tu comprobante de pago (si aplica)</li>
              <li>
                • Cancela con 24 horas de anticipación si no puedes asistir
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button onClick={() => router.push('/')} className="w-full" size="lg">
            Volver al inicio
          </Button>
          {/*           
          <Button
            variant="outline"
            onClick={() => window.print()}
            className="w-full"
          >
            Imprimir comprobante
          </Button> */}
        </div>

        {/* Footer Note */}
        {/* <p className="text-xs text-center text-neutral-500 mt-6">
          Recibirás un correo electrónico con los detalles de tu reserva
        </p> */}
      </div>
    </div>
  );
};
