import React from "react";
import {
  CreditCard,
  AlertCircle,
  CheckCircle,
  XCircle,
  Calendar,
  Phone,
} from "lucide-react";

function Content() {
  return (
    <section className="md:max-w-5xl mx-auto md:px-6 lg:px-8 pt-8 md:pt-16">
      {/* Payment Policy Section */}
      <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden mb-12">
        <div className="bg-gradient-to-r from-orange-500 to-red-500 p-8">
          <div className="flex items-center gap-4 text-white">
            <div className="bg-white/20 rounded-full p-3">
              <CreditCard size={32} />
            </div>
            <h2 className="text-3xl font-bold">Payment Policy</h2>
          </div>
        </div>

        <div className="p-8 md:p-12">
          <div className="space-y-6">
            <div className="bg-orange-50 border-l-4 border-orange-500 p-6 rounded-r-xl">
              <p className="text-gray-800 leading-relaxed">
                Please note we require{" "}
                <span className="font-bold">
                  50% of the payment on confirmation
                </span>{" "}
                and the balance{" "}
                <span className="font-bold">02 weeks prior to arrival</span>. Or
                the full payment can be settled on confirmation.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <CheckCircle className="text-green-600" size={24} />
                Payment Methods
              </h3>
              <div className="bg-gray-50 rounded-xl p-6">
                <p className="text-gray-800 leading-relaxed mb-3">
                  On-line payment using a personal credit card
                  (Amex/Visa/Master).
                </p>
                <p className="text-gray-600 text-sm">
                  Log in details will be sent on confirmation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Amendment and Cancellation Policy Section */}
      <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-r from-red-500 to-orange-500 p-8">
          <div className="flex items-center gap-4 text-white">
            <div className="bg-white/20 rounded-full p-3">
              <AlertCircle size={32} />
            </div>
            <h2 className="text-3xl font-bold">
              Amendment and Cancellation Policy
            </h2>
          </div>
        </div>

        <div className="p-8 md:p-12">
          <div className="space-y-8">
            {/* General Information */}
            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-xl">
              <p className="text-gray-800 leading-relaxed mb-3">
                Cancellation of bookings is possible through www.jwingtours.com.
                However this is subject to cancellation, bank and administrative
                charges.
              </p>
              <p className="text-gray-800 leading-relaxed">
                Cancellation of bookings will not be accommodated within a time
                frame of{" "}
                <span className="font-bold">
                  14 days prior to the commencement of the Tour
                </span>
                . This would vary based on the hotels cancellation policy and
                the period of the booking.
              </p>
            </div>

            {/* Cancellation Policy Table */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Calendar className="text-orange-600" size={24} />
                Our Cancellation Policy
              </h3>

              <div className="space-y-4">
                {/* 31 Days */}
                <div className="bg-green-50 border border-green-200 rounded-xl p-6 hover:shadow-md transition-shadow duration-300">
                  <div className="flex items-start gap-4">
                    <div className="bg-green-500 rounded-full p-2 flex-shrink-0">
                      <CheckCircle className="text-white" size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">
                        31 Days or More Prior to Arrival
                      </h4>
                      <p className="text-gray-700">
                        Cancellations informed 31 days prior to arrival, will be
                        eligible for a{" "}
                        <span className="font-bold text-green-700">
                          full refund
                        </span>
                        .
                      </p>
                    </div>
                  </div>
                </div>

                {/* 15 Days */}
                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 hover:shadow-md transition-shadow duration-300">
                  <div className="flex items-start gap-4">
                    <div className="bg-yellow-500 rounded-full p-2 flex-shrink-0">
                      <AlertCircle className="text-white" size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">
                        15 Days or More Prior to Arrival
                      </h4>
                      <p className="text-gray-700">
                        Cancellations informed 15 days or (more), prior to
                        arrival will be charged{" "}
                        <span className="font-bold text-yellow-700">
                          50% cancellation
                        </span>
                        .
                      </p>
                    </div>
                  </div>
                </div>

                {/* Less than 15 Days */}
                <div className="bg-red-50 border border-red-200 rounded-xl p-6 hover:shadow-md transition-shadow duration-300">
                  <div className="flex items-start gap-4">
                    <div className="bg-red-500 rounded-full p-2 flex-shrink-0">
                      <XCircle className="text-white" size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">
                        Less Than 15 Days Prior to Arrival
                      </h4>
                      <p className="text-gray-700">
                        Cancellation informed less than 15 days prior to arrival
                        will be charged{" "}
                        <span className="font-bold text-red-700">
                          full cancellation
                        </span>
                        .
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Important Notice */}
            <div className="bg-orange-50 border-l-4 border-orange-500 p-6 rounded-r-xl">
              <div className="flex items-start gap-3">
                <AlertCircle
                  className="text-orange-600 flex-shrink-0 mt-1"
                  size={24}
                />
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">Please Note:</h4>
                  <p className="text-gray-800 leading-relaxed">
                    Our cancellation policy varies during peak period{" "}
                    <span className="font-semibold">
                      (July to August & December to February)
                    </span>
                  </p>
                </div>
              </div>
            </div>

            {/* Amendment Section */}
            <div className="bg-gray-50 rounded-xl p-6 md:p-8">
              <div className="flex items-start gap-4 mb-4">
                <Phone className="text-orange-600 flex-shrink-0" size={28} />
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    To Amend Your Booking
                  </h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Please, contact Customer Care hotline or your travel
                    consultant, indicating your reference number.
                  </p>
                  <p className="text-gray-600 text-sm">
                    www.jwingtours.com reserves the right to accept / decline
                    amendment requested by customers.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="mt-12 text-center bg-gradient-to-r from-orange-500 to-red-600 rounded-3xl p-8 text-white">
        <h3 className="text-2xl font-bold mb-4">Have Questions?</h3>
        <p className="text-orange-50">
          If you need clarification on our policies, please do not hesitate to
          contact us.
        </p>
      </div>
    </section>
  );
}

export default Content;
