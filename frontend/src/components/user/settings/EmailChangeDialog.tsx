"use client";
import { useState } from "react";
import { Mail } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface EmailChangeDialogProps {
  currentEmail: string;
}

export function EmailChangeDialog({ currentEmail }: EmailChangeDialogProps) {
  const [newEmail, setNewEmail] = useState('');
  const [isChangingEmail, setIsChangingEmail] = useState(false);

  const handleChangeEmail = async () => {
    setIsChangingEmail(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Changing email to:', newEmail);
      // TODO: Implement actual API call
    } catch (error) {
      console.error('Error changing email:', error);
    } finally {
      setIsChangingEmail(false);
      setNewEmail('');
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="bg-background/50 hover:bg-accent">
          Change
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-background/95 border border-border">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-foreground">
            <Mail className="w-5 h-5 text-primary" />
            Change Email Address
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Enter your new email address below
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="email" className="text-foreground">New Email</Label>
            <Input
              id="email"
              type="email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              className="bg-background border-input focus:border-primary/50"
              placeholder="Enter new email address"
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            onClick={handleChangeEmail}
            disabled={!newEmail || isChangingEmail}
            className="bg-primary/10 text-primary hover:bg-primary/20"
          >
            {isChangingEmail ? (
              <div className="flex items-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary" />
                <span>Changing...</span>
              </div>
            ) : (
              'Change Email'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
} 