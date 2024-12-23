import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { Eye, EyeOff } from 'lucide-react';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { registerSchema } from '../../lib/auth/validation';
import type { RegisterCredentials } from '../../lib/auth/types';
import { useWelcomeStore } from '../../lib/store/welcomeStore';

export function RegisterForm() {
  const { loginWithRedirect } = useAuth0();
  const [showPassword, setShowPassword] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const navigate = useNavigate();
  const { setShowWelcome, setRegistrationComplete } = useWelcomeStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterCredentials>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterCredentials) => {
    try {
      setIsLoading(true);
      
      // Set registration flags
      setRegistrationComplete(true);
      localStorage.setItem('registration_complete', 'true');
      
      await loginWithRedirect({
        appState: {
          returnTo: '/dashboard',
          email: data.email,
          name: data.name,
        },
        authorizationParams: {
          screen_hint: 'signup',
          redirect_uri: `${window.location.origin}/dashboard`,
        },
      });
      
    } catch (error) {
      console.error('Registration error:', error);
      setShowWelcome(false);
      setRegistrationComplete(false);
      localStorage.removeItem('registration_complete');
      toast.error('Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Full Name
        </label>
        <input
          id="name"
          type="text"
          {...register('name')}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          id="email"
          type="email"
          {...register('email')}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <div className="relative">
          <input
            id="password"
            type={showPassword ? 'text' : 'password'}
            {...register('password')}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5 text-gray-400" />
            ) : (
              <Eye className="h-5 w-5 text-gray-400" />
            )}
          </button>
        </div>
        {errors.password && (
          <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
        )}
      </div>

      <div className="space-y-4">
        <div className="flex items-center">
          <input
            id="accept-terms"
            type="checkbox"
            {...register('acceptTerms')}
            className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
          />
          <label htmlFor="accept-terms" className="ml-2 block text-sm text-gray-900">
            I accept the{' '}
            <a href="/terms" className="font-medium text-primary hover:text-secondary">
              Terms and Conditions
            </a>
          </label>
        </div>
        {errors.acceptTerms && (
          <p className="text-sm text-red-600">{errors.acceptTerms.message}</p>
        )}

        <div className="flex items-center">
          <input
            id="accept-privacy"
            type="checkbox"
            {...register('acceptPrivacy')}
            className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
          />
          <label htmlFor="accept-privacy" className="ml-2 block text-sm text-gray-900">
            I accept the{' '}
            <a href="/privacy" className="font-medium text-primary hover:text-secondary">
              Privacy Policy
            </a>
          </label>
        </div>
        {errors.acceptPrivacy && (
          <p className="text-sm text-red-600">{errors.acceptPrivacy.message}</p>
        )}
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        type="submit"
        disabled={isLoading}
        className="w-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50"
      >
        {isLoading ? 'Creating account...' : 'Create account'}
      </motion.button>
    </form>
  );
}