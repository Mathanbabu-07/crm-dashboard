"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { profileSettingsSchema, ProfileSettingsInput } from "@/lib/validators";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { randomLatency } from "@/lib/mock-api";
import { Loader2 } from "lucide-react";

// Mock user data that would normally come from an API/session
const defaultValues: Partial<ProfileSettingsInput> = {
  name: "Admin User",
  email: "admin@crmpro.dev",
  bio: "Senior administrator managing the CRM dashboard platform. Focused on streamlining operations.",
};

export function ProfileForm() {
  const [isSaving, setIsSaving] = useState(false);

  const form = useForm<ProfileSettingsInput>({
    resolver: zodResolver(profileSettingsSchema),
    defaultValues,
    mode: "onChange",
  });

  const { isDirty } = form.formState;

  async function onSubmit(data: ProfileSettingsInput) {
    setIsSaving(true);
    
    // Simulate network request
    await new Promise((resolve) => setTimeout(resolve, randomLatency() + 500));
    
    toast.success("Profile updated", {
      description: "Your changes have been saved successfully.",
    });
    
    // Reset the form with the new data to clear the dirty state
    form.reset(data);
    setIsSaving(false);
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-2">
        <label htmlFor="name" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Full Name</label>
        <Input id="name" placeholder="John Doe" {...form.register("name")} />
        <p className="text-[0.8rem] text-muted-foreground">
          This is the name that will be displayed on your profile and in emails.
        </p>
        {form.formState.errors.name && (
          <p className="text-[0.8rem] font-medium text-destructive">{form.formState.errors.name.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Email Address</label>
        <Input id="email" placeholder="admin@crmpro.dev" type="email" {...form.register("email")} />
        {form.formState.errors.email && (
          <p className="text-[0.8rem] font-medium text-destructive">{form.formState.errors.email.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="bio" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Bio</label>
        <textarea
          id="bio"
          className="flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 resize-none"
          placeholder="Tell us a little bit about yourself"
          {...form.register("bio")}
        />
        <p className="text-[0.8rem] text-muted-foreground">
          You can write a short biography about yourself. Max 280 characters.
        </p>
        {form.formState.errors.bio && (
          <p className="text-[0.8rem] font-medium text-destructive">{form.formState.errors.bio.message}</p>
        )}
      </div>

      <div className="flex gap-4 pt-4 border-t">
        <Button type="submit" disabled={!isDirty || isSaving} className="min-w-24">
          {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isSaving ? "Saving..." : "Save Changes"}
        </Button>
        <Button
          type="button"
          variant="outline"
          disabled={!isDirty || isSaving}
          onClick={() => form.reset()}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
