import React from 'react'
import "../../../assets/styles/components/MainLayout.css";

const FooterClient = () => {
    return (
        <footer className="footer-container padding-common">
            <div className="mx-auto grid grid-cols-1 md:grid-cols-5 gap-6">
                <div>
                    <h4 className="font-bold mb-4">Company Info</h4>
                    <ul className="space-y-2">
                        <li><a href="#" className="hover:underline">About Us</a></li>
                        <li><a href="#" className="hover:underline">Carrier</a></li>
                        <li><a href="#" className="hover:underline">We are hiring</a></li>
                        <li><a href="#" className="hover:underline">Blog</a></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-bold mb-4">Legal</h4>
                    <ul className="space-y-2">
                        <li><a href="#" className="hover:underline">About Us</a></li>
                        <li><a href="#" className="hover:underline">Carrier</a></li>
                        <li><a href="#" className="hover:underline">We are hiring</a></li>
                        <li><a href="#" className="hover:underline">Blog</a></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-bold mb-4">Features</h4>
                    <ul className="space-y-2">
                        <li><a href="#" className="hover:underline">Business Marketing</a></li>
                        <li><a href="#" className="hover:underline">User Analytic</a></li>
                        <li><a href="#" className="hover:underline">Live Chat</a></li>
                        <li><a href="#" className="hover:underline">Unlimited Support</a></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-bold mb-4">Resources</h4>
                    <ul className="space-y-2">
                        <li><a href="#" className="hover:underline">IOS & Android</a></li>
                        <li><a href="#" className="hover:underline">Watch a Demo</a></li>
                        <li><a href="#" className="hover:underline">Customers</a></li>
                        <li><a href="#" className="hover:underline">API</a></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-bold mb-4">Get In Touch</h4>
                    <ul className="space-y-2">
                        <li className="flex items-center">
                            <span className="mr-2">📞</span>
                            (480) 555-0103
                        </li>
                        <li className="flex items-center">
                            <span className="mr-2">📍</span>
                            4517 Washington Ave.
                        </li>
                        <li className="flex items-center">
                            <span className="mr-2">✉️</span>
                            debra.holt@example.com
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
    )
}

export default FooterClient