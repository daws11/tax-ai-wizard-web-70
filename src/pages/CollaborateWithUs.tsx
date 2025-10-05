import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/components/ui/use-toast';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import apiService from '@/services/api';

const partnershipTypes = [
  'collaborateWithUs.taxAgent',
  'collaborateWithUs.taxAdvisoryFirm',
  'collaborateWithUs.accountingFirm',
  'collaborateWithUs.technologyPartner',
  'collaborateWithUs.other'
];

const formSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  companyName: z.string().min(2, 'Company name must be at least 2 characters'),
  designation: z.string().min(2, 'Designation must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  website: z.string().optional(),
  partnershipTypes: z.array(z.string()).min(1, 'Please select at least one partnership type'),
  otherPartnershipType: z.string().optional(),
  licenseNumber: z.string().optional(),
  servicesDescription: z.string().min(10, 'Please provide a brief description of your services'),
  whyPartner: z.string().min(10, 'Please explain why you want to partner with TaxAI'),
  consent: z.boolean().refine(val => val === true, 'You must agree to share your information'),
});

type FormData = z.infer<typeof formSchema>;

export default function CollaborateWithUs() {
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: '',
      companyName: '',
      designation: '',
      email: '',
      phone: '',
      website: '',
      partnershipTypes: [],
      otherPartnershipType: '',
      licenseNumber: '',
      servicesDescription: '',
      whyPartner: '',
      consent: false,
    },
  });

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast({
          title: 'File too large',
          description: 'Please upload a file smaller than 5MB',
          variant: 'destructive',
        });
        return;
      }
      if (!['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(file.type)) {
        toast({
          title: 'Invalid file type',
          description: 'Please upload a PDF or Word document',
          variant: 'destructive',
        });
        return;
      }
      setUploadedFile(file);
      toast({
        title: 'File uploaded',
        description: `${file.name} has been uploaded successfully`,
      });
    }
  };

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);

    try {
      // Prepare form data for submission
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (key === 'partnershipTypes' && Array.isArray(value)) {
          formData.append(key, JSON.stringify(value));
        } else if (value !== undefined && value !== '') {
          formData.append(key, String(value));
        }
      });

      if (uploadedFile) {
        formData.append('companyProfile', uploadedFile);
      }

      // Submit to backend
      await apiService.submitPartnerForm(formData);

      console.log('Partner form submitted:', data);

      toast({
        title: 'Interest Submitted Successfully!',
        description: 'Thank you for your interest in partnering with TaxAI. We will review your application and contact you soon.',
      });

      // Reset form after successful submission
      form.reset();
      setUploadedFile(null);

    } catch (error) {
      console.error('Submission error:', error);
      toast({
        title: 'Submission Failed',
        description: 'There was an error submitting your form. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            {t('collaborateWithUs.title')}
          </h1>
          <div className="max-w-3xl mx-auto text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            <p className="mb-4">
              {t('collaborateWithUs.description')}
            </p>
            <ul className="mb-6 text-left space-y-2">
              <li className="flex items-start gap-3">
                <span className="text-primary text-xl mt-1">•</span>
                <span>{t('collaborateWithUs.feature1')}</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary text-xl mt-1">•</span>
                <span>{t('collaborateWithUs.feature2')}</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary text-xl mt-1">•</span>
                <span>{t('collaborateWithUs.feature3')}</span>
              </li>
            </ul>
            <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-primary p-4 rounded-r-lg">
              <p className="text-blue-800 dark:text-blue-200 font-medium">
                👉 {t('collaborateWithUs.cta')}
              </p>
            </div>
            <p className="mt-4 text-gray-700 dark:text-gray-300">
              {t('collaborateWithUs.formInstruction')}
            </p>
          </div>
        </div>

        {/* Form Section */}
        <Card className="shadow-2xl border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
          <CardHeader className="text-center pb-8">
            <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
              {t('collaborateWithUs.formTitle')}
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Personal Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('collaborateWithUs.fullName')} *</FormLabel>
                        <FormControl>
                          <Input placeholder={t('collaborateWithUs.fullNamePlaceholder')} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="companyName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('collaborateWithUs.companyName')} *</FormLabel>
                        <FormControl>
                          <Input placeholder={t('collaborateWithUs.companyNamePlaceholder')} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="designation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('collaborateWithUs.designation')} *</FormLabel>
                        <FormControl>
                          <Input placeholder={t('collaborateWithUs.designationPlaceholder')} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('collaborateWithUs.email')} *</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder={t('collaborateWithUs.emailPlaceholder')} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('collaborateWithUs.phone')} *</FormLabel>
                        <FormControl>
                          <Input type="tel" placeholder={t('collaborateWithUs.phonePlaceholder')} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="website"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('collaborateWithUs.website')}</FormLabel>
                        <FormControl>
                          <Input type="url" placeholder={t('collaborateWithUs.websitePlaceholder')} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Partnership Types */}
                <FormField
                  control={form.control}
                  name="partnershipTypes"
                  render={() => (
                    <FormItem>
                      <FormLabel>{t('collaborateWithUs.partnershipType')} *</FormLabel>
                      <FormDescription className="mb-4">
                        {t('collaborateWithUs.partnershipTypeDescription')}
                      </FormDescription>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {partnershipTypes.map((type) => (
                          <FormField
                            key={type}
                            control={form.control}
                            name="partnershipTypes"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(type)}
                                    onCheckedChange={(checked) => {
                                      const currentValue = field.value || [];
                                      if (checked) {
                                        field.onChange([...currentValue, type]);
                                      } else {
                                        field.onChange(currentValue.filter((value) => value !== type));
                                      }
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="font-normal cursor-pointer">
                                  {t(type)}
                                </FormLabel>
                              </FormItem>
                            )}
                          />
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Other Partnership Type (conditional) */}
                {form.watch('partnershipTypes')?.includes('collaborateWithUs.other') && (
                  <FormField
                    control={form.control}
                    name="otherPartnershipType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('collaborateWithUs.otherPartnershipType')}</FormLabel>
                        <FormControl>
                          <Input placeholder={t('collaborateWithUs.otherPartnershipTypePlaceholder')} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                {/* License Number */}
                <FormField
                  control={form.control}
                  name="licenseNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('collaborateWithUs.licenseNumber')}</FormLabel>
                      <FormDescription>
                        {t('collaborateWithUs.licenseNumberDescription')}
                      </FormDescription>
                      <FormControl>
                        <Input placeholder={t('collaborateWithUs.licenseNumberPlaceholder')} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Description Fields */}
                <div className="space-y-6">
                  <FormField
                    control={form.control}
                    name="servicesDescription"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('collaborateWithUs.servicesDescription')} *</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder={t('collaborateWithUs.servicesDescriptionPlaceholder')}
                            className="min-h-[100px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="whyPartner"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('collaborateWithUs.whyPartner')} *</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder={t('collaborateWithUs.whyPartnerPlaceholder')}
                            className="min-h-[100px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* File Upload */}
                <div className="space-y-4">
                  <Label>{t('collaborateWithUs.uploadLabel')}</Label>
                  <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center hover:border-primary transition-colors">
                    <input
                      type="file"
                      id="companyProfile"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                    <label
                      htmlFor="companyProfile"
                      className="cursor-pointer flex flex-col items-center space-y-2"
                    >
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                        <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        <span className="font-medium text-primary">{t('collaborateWithUs.uploadClick')}</span> {t('collaborateWithUs.uploadOr')}
                      </div>
                      <div className="text-xs text-gray-500">
                        {t('collaborateWithUs.uploadFormats')}
                      </div>
                    </label>
                  </div>
                  {uploadedFile && (
                    <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {uploadedFile.name} {t('collaborateWithUs.uploadSuccess')}
                    </div>
                  )}
                </div>

                {/* Consent Checkbox */}
                <FormField
                  control={form.control}
                  name="consent"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="text-sm font-normal cursor-pointer">
                          {t('collaborateWithUs.consentText')} *
                        </FormLabel>
                      </div>
                    </FormItem>
                  )}
                />

                {/* Submit Button */}
                <div className="pt-6">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full text-lg py-6 bg-primary hover:bg-primary/90"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        {t('collaborateWithUs.submitting')}
                      </div>
                    ) : (
                      `👉 ${t('collaborateWithUs.submitButton')}`
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
}
