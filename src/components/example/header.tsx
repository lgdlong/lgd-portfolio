"use client";

import { LogOut, Menu, Settings, User, X, Globe, ChevronDown } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "~/lib/auth-client";

import { useState } from "react";
import { cn } from "~/lib/utils";
import { Button } from "~/ui/primitives/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/ui/primitives/dropdown-menu";
import { ThemeToggle } from "./theme-toggle";
import { useTranslation } from "react-i18next";
import { languages } from "./locales";


type HeaderProps = {
  showAuth?: boolean;
};

export function Header({ showAuth = true }: HeaderProps) {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { i18n, t } = useTranslation();
  const handleLanguageChange = (lng: string) => {
    i18n.changeLanguage(lng); // Thay đổi ngôn ngữ bằng i18n
  };

  const handleSignOut = () => {
    const auth = localStorage.getItem("pocketbase_auth");
    const token = auth ? JSON.parse(auth)?.token : undefined;
    void signOut(token);
  };


  const navigation = [
    { name: t("header.home"), href: "/" },
    { name: t("header.posts"), href: "/posts" },
    { name: "VieClone", href: "/vieclone" },
    { name: t("header.videos"), href: "/videos" },
    { name: t("header.chats"), href: "/chat" },];

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                VieVlog
              </span>
            </Link>
            <nav className="hidden md:flex">
              <ul className="flex items-center gap-6">
                {navigation.map((item) => {
                  const isActive =
                    pathname === item.href ||
                    (item.href !== "/" && pathname?.startsWith(item.href));

                  return (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className={cn(
                          "text-sm font-medium transition-colors hover:text-primary",
                          isActive
                            ? "text-primary font-semibold"
                            : "text-muted-foreground",
                        )}
                      >
                        {item.name}
                      </Link>
                    </li>
                  );
                })}

              </ul>
            </nav>
          </div>

          <div className="flex items-center gap-4">

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Globe className="h-5 w-5" /> {/* Biểu tượng Globe cho ngôn ngữ */}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                {languages.map(lang => (
                  <DropdownMenuItem key={lang.code} onClick={() => handleLanguageChange(lang.code)}>
                    {lang.label}
                  </DropdownMenuItem>
                ))}

                {/* <DropdownMenuItem onClick={() => handleLanguageChange("en")}>
                  English
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleLanguageChange("vi")}>
                  Tiếng Việt
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleLanguageChange("ko")}>
                  한국어
                </DropdownMenuItem> */}
              </DropdownMenuContent>
            </DropdownMenu>
            {/* <Cart /> */}

            {showAuth && (
              <div className="hidden md:block">
                {session ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="relative overflow-hidden rounded-full"
                      >
                        {session.user?.image ? (
                          <img
                            src={session.user.image}
                            alt={session.user.username || "User"}
                            className="h-9 w-9 rounded-full object-cover"
                          />
                        ) : (
                          <User className="h-5 w-5" />
                        )}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                      <div className="flex items-center justify-start gap-2 p-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                          {session.user?.image ? (
                            <img
                              src={session.user.image}
                              alt={session.user.username || "User"}
                              className="h-7 w-7 rounded-full object-cover"
                            />
                          ) : (
                            <User className="h-4 w-4 text-primary" />
                          )}
                        </div>
                        <div className="flex flex-col space-y-0.5">
                          <p className="text-sm font-medium">
                            {session.user?.name || "User"}
                          </p>
                          <p className="text-xs text-muted-foreground truncate max-w-[160px]">
                            {session.user?.email}
                          </p>
                        </div>
                      </div>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link href="/profile" className="cursor-pointer">
                          <User className="mr-2 h-4 w-4" />
                          Profile
                        </Link>
                      </DropdownMenuItem>
                      {/* <DropdownMenuItem asChild>
                        <Link
                          href="/profile/settings"
                          className="cursor-pointer"
                        >
                          <Settings className="mr-2 h-4 w-4" />
                          Settings
                        </Link>
                      </DropdownMenuItem> */}
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={handleSignOut}
                        className="cursor-pointer text-destructive focus:text-destructive"
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        Log out
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <div className="flex items-center gap-2">
                    <Link href="/auth/sign-in">
                      <Button variant="ghost" size="sm">
                        Log in
                      </Button>
                    </Link>
                    <Link href="/auth/sign-up">
                      <Button size="sm">Sign up</Button>
                    </Link>
                  </div>
                )}
              </div>
            )}

            <ThemeToggle />

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden">
          <div className="space-y-1 px-4 py-3 border-b">
            {navigation.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.href !== "/" && pathname?.startsWith(item.href));

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "block py-2 px-3 text-base font-medium rounded-md",
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-foreground hover:bg-muted/50 hover:text-primary",
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              );
            })}


          </div>

          {/* ✅ Hiển thị icon/avatar khi đã đăng nhập (mobile) */}
          {showAuth && session && (
            <div className="flex items-center justify-between px-4 py-3 border-b">
              <div className="flex items-center gap-3">
                {session.user?.image ? (
                  <img
                    src={session.user.image}
                    alt={session.user.username || "User"}
                    className="h-8 w-8 rounded-full object-cover"
                  />
                ) : (
                  <User className="h-6 w-6" />
                )}
                <div className="flex flex-col text-sm">
                  <span className="font-medium">
                    {session.user?.name || "User"}
                  </span>
                  <span className="text-muted-foreground text-xs truncate max-w-[150px]">
                    {session.user?.email}
                  </span>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleSignOut}
                className="text-destructive"
              >
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          )}



          {showAuth && !session && (
            <div className="space-y-1 px-4 py-3 border-b">
              <Link
                href="/auth/sign-in"
                className="block py-2 px-3 text-base font-medium rounded-md hover:bg-muted/50"
                onClick={() => setMobileMenuOpen(false)}
              >
                Log in
              </Link>
              <Link
                href="/auth/sign-up"
                className="block py-2 px-3 text-base font-medium rounded-md bg-primary text-primary-foreground hover:bg-primary/90"
                onClick={() => setMobileMenuOpen(false)}
              >
                Sign up
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
