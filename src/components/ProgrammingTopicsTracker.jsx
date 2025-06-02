import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card.jsx";
import { Checkbox } from "@/components/ui/checkbox.jsx";

const topics = [
  {
    category: "Basic Programming",
    items: [
      {
        name: "Array manipulation",
        link: "https://www.w3schools.com/java/java_arrays.asp",
      },
      {
        name: "Control flow",
        link: "https://www.geeksforgeeks.org/control-flow-statements-in-programming/",
      },
      {
        name: "Iterative programming",
        link: "https://www.geeksforgeeks.org/iteration-statements-in-programming/",
      },
      {
        name: "Method call",
        link: "https://www.w3schools.com/java/java_methods.asp",
      },
      {
        name: "Basic Java",
        link: "https://docs.oracle.com/javase/tutorial/java/nutsandbolts/index.html",
      },
      {
        name: "Basic data type",
        link: "https://www.geeksforgeeks.org/data-types-in-java/",
      },
      {
        name: "Basic knowledge of String, I/O, java.util.*, Math API",
        link: "https://docs.google.com/document/d/17eeN3lcsUTbVm0-WjIEyB8k2k7oeOwSeoPnoBUuado0/edit?usp=sharing",
      },
      {
        name: "Parsing with StringTokenizer/Scanner API",
        link: "https://docs.google.com/document/d/1DYjVx0eRwauZJcy9libBBau9NcIFKfOkdKEdd9jw7CI/edit?usp=sharing",
      },
    ],
    color: "from-blue-500 to-cyan-500",
    bgColor: "bg-gradient-to-br from-blue-50 to-cyan-50",
  },
  {
    category: "Collection Framework",
    items: [
      {
        name: "Data Structure",
        link: "https://www.geeksforgeeks.org/data-structures/",
      },
      {
        name: "Composite data structure",
        link: "https://docs.google.com/document/d/1FOxtJgxsZu9Y6Pp3FUv5oyjhpm6s7Vmiex9TL1SRs0Q/edit?usp=sharing",
      },
      {
        name: "LinkedList manipulation",
        link: "https://www.w3schools.com/java/java_linkedlist.asp",
      },
      {
        name: "Stack/Queue operations",
        link: "https://www.programiz.com/java-programming/stack",
      },
      {
        name: "Traversing Tree data structure",
        link: "https://www.geeksforgeeks.org/tree-traversals-inorder-preorder-and-postorder/",
      },
      {
        name: "Basic Search/Sorting algorithm",
        link: "https://visualgo.net/en/sorting",
      },
      { name: "Recursion", link: "https://www.geeksforgeeks.org/recursion/" },
    ],
    color: "from-green-500 to-emerald-500",
    bgColor: "bg-gradient-to-br from-green-50 to-emerald-50",
  },
  {
    category: "Object Oriented Programming",
    items: [
      {
        name: "Basic concept of OOP",
        link: "https://www.geeksforgeeks.org/introduction-of-object-oriented-programming/",
      },
      {
        name: "Class design",
        link: "https://www.w3schools.com/java/java_classes.asp",
      },
    ],
    color: "from-purple-500 to-pink-500",
    bgColor: "bg-gradient-to-br from-purple-50 to-pink-50",
  },
  {
    category: "Puzzle",
    items: [
      {
        name: "Simple puzzle",
        link: "https://leetcode.com/problemset/all/?difficulty=Easy",
      },
      { name: "Math Puzzle", link: "https://projecteuler.net/" },
    ],
    color: "from-orange-500 to-red-500",
    bgColor: "bg-gradient-to-br from-orange-50 to-red-50",
  },
];

export default function ProgrammingTopicsTracker() {
  const [checkedItems, setCheckedItems] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProgress = () => {
      try {
        const saved = localStorage.getItem("programmingTopicsProgress");
        if (saved) {
          setCheckedItems(JSON.parse(saved));
        }
      } catch (error) {
        console.error("Error loading progress:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadProgress();
  }, []);

  useEffect(() => {
    if (!isLoading) {
      try {
        localStorage.setItem(
          "programmingTopicsProgress",
          JSON.stringify(checkedItems),
        );
      } catch (error) {
        console.error("Error saving progress:", error);
      }
    }
  }, [checkedItems, isLoading]);

  const toggleItem = (item) => {
    setCheckedItems((prev) => ({
      ...prev,
      [item]: !prev[item],
    }));
  };

  const getProgress = (items) => {
    if (!items?.length) return 0;
    const completed = items.filter((item) => checkedItems[item]).length;
    return Math.round((completed / items.length) * 100);
  };

  const totalItems = topics.reduce(
    (sum, section) => sum + section.items.length,
    0,
  );
  const completedItems = Object.values(checkedItems).filter(Boolean).length;
  const overallProgress =
    totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 p-6">
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Programming Topics Tracker
          </h1>
          <p className="text-lg text-gray-600">
            Master your programming journey, one topic at a time
          </p>

          <div className="max-w-md mx-auto">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">
                Overall Progress
              </span>
              <span className="text-sm font-bold text-purple-600">
                {overallProgress}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${overallProgress}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              {completedItems} of {totalItems} topics completed
            </p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {topics.map((section, i) => {
            const progress = getProgress(section.items);
            return (
              <Card
                key={i}
                className={`${section.bgColor} border border-white/50 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1`}
              >
                <CardContent>
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-3">
                      <h2
                        className={`text-2xl font-bold bg-gradient-to-r ${section.color} bg-clip-text text-transparent`}
                      >
                        {section.category}
                      </h2>
                      <div className="text-right">
                        <div className="text-sm font-medium text-gray-600">
                          Progress
                        </div>
                        <div
                          className={`text-2xl font-bold bg-gradient-to-r ${section.color} bg-clip-text text-transparent`}
                        >
                          {progress}%
                        </div>
                      </div>
                    </div>
                    <div className="w-full bg-white/70 rounded-full h-2">
                      <div
                        className={`bg-gradient-to-r ${section.color} h-2 rounded-full transition-all duration-500 ease-out`}
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {section.items.map((item, j) => (
                      <div
                        key={j}
                        className={`flex items-center space-x-4 p-3 rounded-xl transition-all duration-300 cursor-pointer hover:shadow-md ${
                          checkedItems[item.name]
                            ? "bg-white/70 shadow-sm"
                            : "bg-white/40 hover:bg-white/60"
                        }`}
                      >
                        <Checkbox
                          checked={checkedItems[item.name] || false}
                          onCheckedChange={() => toggleItem(item.name)}
                        />
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`flex-1 font-medium transition-all duration-300 ${
                            checkedItems[item.name]
                              ? "line-through text-gray-500"
                              : "text-gray-800 hover:text-purple-600"
                          }`}
                        >
                          {item.name}
                        </a>
                        {checkedItems[item.name] && (
                          <div className="text-green-500 animate-pulse">
                            <svg
                              className="w-5 h-5"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {overallProgress === 100 && (
          <div className="text-center p-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-3xl shadow-2xl">
            <div className="text-6xl mb-4">🎉</div>
            <h3 className="text-3xl font-bold text-white mb-2">
              Congratulations!
            </h3>
            <p className="text-white/90 text-lg">
              You've completed all programming topics! You're ready to tackle
              advanced challenges!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
