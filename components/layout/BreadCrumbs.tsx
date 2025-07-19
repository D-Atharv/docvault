"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { Breadcrumb } from "@/lib/drive-utils";

interface BreadcrumbsProps {
  breadcrumbs: Breadcrumb[];
}

export default function Breadcrumbs({ breadcrumbs }: BreadcrumbsProps) {
  const searchParams = useSearchParams();
  const viewQuery = searchParams.get("view")
    ? `?view=${searchParams.get("view")}`
    : "";

  return (
    <nav
      className="flex items-center text-xl font-semibold"
      aria-label="Breadcrumb"
    >
      <ol className="inline-flex items-center space-x-1 md:space-x-2">
        {breadcrumbs.map((crumb, index) => {
          const isLast = index === breadcrumbs.length - 1;
          const hrefWithQuery = `${crumb.href}${viewQuery}`;

          return (
            <li key={index} className="inline-flex items-center">
              {!isLast ? (
                <>
                  <Link
                    href={hrefWithQuery}
                    className="inline-flex items-center text-slate-200 hover:text-blue-300 transition-colors"
                  >
                    {crumb.name}
                  </Link>
                  <ChevronRight size={20} className="mx-1 text-slate-400" />
                </>
              ) : (
                <span className="text-slate-100">{crumb.name}</span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
