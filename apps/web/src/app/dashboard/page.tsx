import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { createClient } from "@/utils/supabase/server";
import { GenerateForm } from "./generate-form";

export default async function Page() {
  const supabase = await createClient();
  const { data } = await supabase.from("profiles").select("id, email").single();
  const { data: apiKeys } = await supabase.from("api_keys").select("*");

  return (
    <SidebarProvider>
      <AppSidebar email={data?.email ?? ""} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbPage>Dashboard</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="rounded-xl bg-muted/50 p-4">
            <h2 className="text-2xl font-bold mb-4">Welcome to Supavec Beta</h2>
            <p>Generate your API key to get started with Supavec.</p>
          </div>
          <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min p-4">
            <h3 className="text-xl font-semibold mb-4">API Key Generation</h3>
            <p>Your API key will appear here once generated.</p>
            {Array.isArray(apiKeys) && apiKeys?.length > 0 ? (
              <span className="p-1 text-sm bg-muted-foreground/20 rounded-md">
                {apiKeys[0].api_key}
              </span>
            ) : (
              <GenerateForm />
            )}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}