import { Link } from "react-router-dom";
import { Code2 } from "lucide-react";

export default function Footer() {
    return (
        <footer className="border-t border-[var(--color-border)] bg-[var(--color-surface-subtle)] mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div className="col-span-2 md:col-span-1">
                        <Link
                            to="/"
                            className="flex items-center gap-2 font-bold text-lg"
                        >
                            <span className="flex items-center justify-center w-7 h-7 rounded-md bg-brand-600 text-white">
                                <Code2 size={14} />
                            </span>
                            Sys<span className="text-brand-600">Cart</span>
                        </Link>
                        <p className="mt-2 text-sm text-muted max-w-[200px]">
                            Premium source code marketplace for developers.
                        </p>
                    </div>

                    {/* Marketplace */}
                    <div>
                        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted mb-3">
                            Marketplace
                        </h3>
                        <ul className="space-y-2 text-sm">
                            {[
                                "Browse",
                                "Websites",
                                "Dashboards",
                                "Mobile Apps"
                            ].map(item => (
                                <li key={item}>
                                    <Link
                                        to="/store"
                                        className="text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
                                    >
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Sellers */}
                    <div>
                        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted mb-3">
                            Sellers
                        </h3>
                        <ul className="space-y-2 text-sm">
                            {[
                                "Start Selling",
                                "Dashboard",
                                "Payouts",
                                "Guidelines"
                            ].map(item => (
                                <li key={item}>
                                    <Link
                                        to="/register"
                                        className="text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
                                    >
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted mb-3">
                            Company
                        </h3>
                        <ul className="space-y-2 text-sm">
                            {["About", "Terms", "Privacy", "Contact"].map(
                                item => (
                                    <li key={item}>
                                        <a
                                            href="#"
                                            className="text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
                                        >
                                            {item}
                                        </a>
                                    </li>
                                )
                            )}
                        </ul>
                    </div>
                </div>

                <div className="mt-10 pt-6 border-t border-[var(--color-border)] flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-xs text-muted">
                        © {new Date().getFullYear()} SysCart. All rights
                        reserved.
                    </p>
                    
                </div>
            </div>
        </footer>
    );
}
