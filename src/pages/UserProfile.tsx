
import React from 'react';
import NavBar from '@/components/NavBar';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useForm } from 'react-hook-form';
import { toast } from '@/components/ui/use-toast';
import { Save, User } from 'lucide-react';

interface UserProfileFormValues {
  username: string;
  displayName: string;
  email: string;
  language: string;
  gender: string;
  country: string;
  state: string;
  city: string;
  ageGroup: string;
  accent: string;
}

const UserProfile: React.FC = () => {
  const isMobile = useIsMobile();
  
  // Mock user data
  const defaultValues = {
    username: 'johndoe',
    displayName: 'John Doe',
    email: 'john.doe@example.com',
    language: 'en',
    gender: 'male',
    country: 'United States',
    state: 'California',
    city: 'San Francisco',
    ageGroup: '30-40',
    accent: 'General American',
  };
  
  const form = useForm<UserProfileFormValues>({
    defaultValues,
  });
  
  const onSubmit = (data: UserProfileFormValues) => {
    // Here you would actually send the data to the server
    console.log('Profile data submitted:', data);
    
    // Show success toast
    toast({
      title: "Profile updated",
      description: "Your profile has been updated successfully"
    });
  };
  
  // Language options
  const languages = [
    { value: 'en', label: 'English' },
    { value: 'es', label: 'Spanish' },
    { value: 'fr', label: 'French' },
    { value: 'de', label: 'German' },
    { value: 'it', label: 'Italian' },
    { value: 'pt', label: 'Portuguese' },
    { value: 'ru', label: 'Russian' },
    { value: 'zh', label: 'Chinese' },
    { value: 'ja', label: 'Japanese' },
    { value: 'hi', label: 'Hindi' },
  ];
  
  // Gender options
  const genders = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'non-binary', label: 'Non-binary' },
    { value: 'other', label: 'Other' },
    { value: 'prefer-not-to-say', label: 'Prefer not to say' },
  ];
  
  // Age group options
  const ageGroups = [
    { value: 'under-18', label: 'Under 18' },
    { value: '18-24', label: '18-24' },
    { value: '25-34', label: '25-34' },
    { value: '35-44', label: '35-44' },
    { value: '45-54', label: '45-54' },
    { value: '55-64', label: '55-64' },
    { value: '65-plus', label: '65+' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      
      <div className="container pt-24 pb-16 px-4">
        <header className="mb-8">
          <h1 className="text-3xl font-bold mb-2">User Profile</h1>
          <p className="text-muted-foreground">
            Manage your personal information and preferences
          </p>
        </header>
        
        <Card className="max-w-3xl mx-auto shadow-md">
          <CardHeader className="relative">
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="h-12 w-12 text-primary" />
              </div>
              <div className="text-center sm:text-left">
                <CardTitle className="text-xl">{defaultValues.displayName}</CardTitle>
                <CardDescription>@{defaultValues.username}</CardDescription>
              </div>
            </div>
          </CardHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <CardContent className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                          <Input placeholder="username" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="displayName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Display Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Display Name" {...field} />
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
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="email@example.com" type="email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="language"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Preferred Language</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a language" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {languages.map((language) => (
                              <SelectItem key={language.value} value={language.value}>
                                {language.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          Language for recording and transcription
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="gender"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Gender</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select gender" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {genders.map((gender) => (
                              <SelectItem key={gender.value} value={gender.value}>
                                {gender.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="ageGroup"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Age Group</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select age group" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {ageGroups.map((ageGroup) => (
                              <SelectItem key={ageGroup.value} value={ageGroup.value}>
                                {ageGroup.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="country"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Country</FormLabel>
                        <FormControl>
                          <Input placeholder="Country" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="state"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>State/Region</FormLabel>
                        <FormControl>
                          <Input placeholder="State or Region" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>City</FormLabel>
                        <FormControl>
                          <Input placeholder="City" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="accent"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Accent</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. General American, British RP" {...field} />
                        </FormControl>
                        <FormDescription>
                          Your native or primary accent
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
              
              <CardFooter className="flex justify-end">
                <Button type="submit">
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              </CardFooter>
            </form>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default UserProfile;
