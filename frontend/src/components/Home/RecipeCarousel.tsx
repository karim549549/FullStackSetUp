"use client";
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, User, Flame, Dumbbell, Clock } from 'lucide-react';
import Image from 'next/image';
import image from '@/assets/recipe2_files/06a59291-f2a8-4361-8379-d659fa03785e.png';
import image2  from '@/assets/recipes.png'
import image3  from '@/assets/placeholderimage.webp'
const trendingRecipes = [
  {
    id: 1,
    title: "Protein-Packed Quinoa Bowl",
    image: image,
    calories: 450,
    protein: 25,
    rating: 4.8,
    prepTime: "15 min",
    testimonials: [
      {
        name: "Sarah Johnson",
        comment: "This recipe is amazing! I've been making it for my meal prep and it's so filling.",
        rating: 5
      },
      {
        name: "Mike Chen",
        comment: "Perfect balance of protein and carbs. Great for post-workout!",
        rating: 4
      },
      {
        name: "Emma Wilson",
        comment: "Love how easy it is to customize with different vegetables!",
        rating: 5
      }
    ]
  },
  {
    id: 2,
    title: "Mediterranean Grilled Chicken",
    image: image2,
    calories: 380,
    protein: 35,
    rating: 4.9,
    prepTime: "20 min",
    testimonials: [
      {
        name: "Emma Davis",
        comment: "The flavors are incredible! I added some extra herbs and it was perfect.",
        rating: 5
      },
      {
        name: "Alex Thompson",
        comment: "Easy to make and super healthy. Will definitely make again!",
        rating: 5
      },
      {
        name: "James Miller",
        comment: "Perfect for meal prep, stays fresh for days!",
        rating: 4
      }
    ]
  },
  {
    id: 3,
    title: "Vegan Buddha Bowl",
    image: image3,
    calories: 420,
    protein: 18,
    rating: 4.7,
    prepTime: "15 min",
    testimonials: [
      {
        name: "Lisa Wong",
        comment: "As a vegan, this is one of my favorite recipes. So nutritious!",
        rating: 5
      },
      {
        name: "David Kim",
        comment: "Even my meat-loving friends enjoyed this bowl. Great recipe!",
        rating: 4
      },
      {
        name: "Sophie Brown",
        comment: "The tahini dressing is to die for!",
        rating: 5
      }
    ]
  }
];

export default function RecipeCarousel() {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % trendingRecipes.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative overflow-hidden dark:bg-black  bg-neutral-300 ">
      <div className="max-w-[2000px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 pt-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-sky-500 via-blue-500 to-blue-500 bg-clip-text text-transparent">
            Discover Thousands of Healthy Recipes
          </h2>
          <p className="text-neutral-400 max-w-2xl mx-auto text-lg">
            Explore our curated collection of nutritious and delicious recipes, perfectly balanced for your fitness goals.
          </p>
        </motion.div>

        <div className="relative">
          {/* Carousel */}
          <div className="relative h-[500px] md:h-[600px] overflow-hidden">
            {trendingRecipes.map((recipe, index) => (
              <motion.div
                key={recipe.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  opacity: index === currentIndex ? 1 : 0,
                  scale: index === currentIndex ? 1 : 0.8,
                  x: `${(index - currentIndex) * 100}%`
                }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0"
              >
                <div className="relative h-full w-full group">
                  <Image
                    src={recipe.image}
                    alt={recipe.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-opacity duration-300 group-hover:opacity-0" />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent transition-opacity duration-300 group-hover:opacity-0" />
                  
                  {/* Recipe Info */}
                  <div className="absolute bottom-0 left-0 right-0 p-8 transition-opacity duration-300 group-hover:opacity-0">
                    <div className="flex items-center gap-2 mb-3">
                      <Star className="w-6 h-6 text-yellow-400 fill-yellow-400" />
                      <span className="text-white text-xl font-semibold">{recipe.rating}</span>
                    </div>
                    <h3 className="text-4xl font-bold text-white mb-4">{recipe.title}</h3>
                    <div className="flex gap-8 text-sm text-neutral-300">
                      <div className="flex items-center gap-2">
                        <Flame className="w-4 h-4 text-orange-400" />
                        <span>{recipe.calories} cal</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Dumbbell className="w-4 h-4 text-blue-400" />
                        <span>{recipe.protein}g protein</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-violet-400" />
                        <span>{recipe.prepTime}</span>
                      </div>
                    </div>
                  </div>

                  {/* Testimonials Overlay */}
                  <div className="absolute bottom-8 right-8 w-80 space-y-3">
                    {recipe.testimonials.map((testimonial, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.2 }}
                        className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/10"
                      >
                        <div className="flex items-center gap-3 mb-1">
                          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                            <User className="w-4 h-4 text-white" />
                          </div>
                          <div>
                            <div className="flex items-center gap-1">
                              <span className="text-white text-sm font-semibold">{testimonial.name}</span>
                              <div className="flex">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                  <Star key={i} className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                        <p className="text-neutral-200 text-xs ml-11">{testimonial.comment}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mb-8 bg-black p-2">
            {trendingRecipes.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex ? 'bg-blue-500 w-4' : 'bg-white/30'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 