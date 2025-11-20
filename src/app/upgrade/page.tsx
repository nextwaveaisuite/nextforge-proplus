export default function UpgradePage() {
  return (
    <div className="p-10 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Upgrade Your Plan</h1>

      <div className="space-y-6">
        <a
          href="YOUR_STRIPE_LINK_HERE"
          className="block p-6 bg-blue-600 text-white rounded-lg text-center"
        >
          Upgrade with Stripe (Pro+)
        </a>

        <a
          href="https://www.paypal.com/paypalme/nextwaveaisuite"
          className="block p-6 bg-yellow-500 text-black rounded-lg text-center"
        >
          Upgrade with PayPal
        </a>
      </div>
    </div>
  );
}
