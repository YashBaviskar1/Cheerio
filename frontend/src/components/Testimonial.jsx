import React from "react";

const testimonials = [
  {
    name: "Alice Johnson",
    feedback: "This chatbot has truly helped me navigate my emotions and feel more in control of my mental health.",
    avatar: "https://i.pravatar.cc/100?img=1",
  },
  {
    name: "Michael Smith",
    feedback: "The relaxing sounds are a game-changer for my anxiety. I use them every day!",
    avatar: "https://i.pravatar.cc/100?img=2",
  },
  {
    name: "Emily Davis",
    feedback: "A wonderful experience! The AI responses feel so human and comforting.",
    avatar: "https://i.pravatar.cc/100?img=3",
  },
];

export default function Testimonial() {
  return (
    <div className="bg-slate-900 text-white py-16 px-6">
      <h2 className="text-3xl font-semibold text-center mb-8">What Our Users Say</h2>

      <div className="flex flex-col md:flex-row justify-center gap-8">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="bg-slate-800 p-6 rounded-lg shadow-md max-w-sm text-center hover:shadow-lg transition">
            <img src={testimonial.avatar} alt={testimonial.name} className="w-16 h-16 rounded-full mx-auto mb-4" />
            <h3 className="text-lg font-semibold">{testimonial.name}</h3>
            <p className="text-gray-300 mt-2">"{testimonial.feedback}"</p>
          </div>
        ))}
      </div>
    </div>
  );
}
