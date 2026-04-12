import {atom} from 'recoil';
import type {sheetContentType} from '@repo/types/sheet/sheetContentType'

const sheetContent = atom<sheetContentType>({
    key: "sheetContent",
    default: [{
        "sheet": "Fraz",
        "tree": [
            {
            "_id": "6b6351ac6646e06089d88c57",
            "name": "Arrays",
            "parentFolderId": null,
            "order": 0,
            "children": [
                {
                "_id": "arr-sub-1",
                "name": "Sliding Window",
                "parentFolderId": "6b6351ac6646e06089d88c57",
                "order": 0,
                "children": [],
                "questions": [
                    {
                    "_id": "0b9df103f2735985100e204b",
                    "title": "Two Sum",
                    "difficulty": "easy",
                    "link": "https://leetcode.com/problems/two-sum/",
                    "platform": "leetcode",
                    "isSolved": false,
                    "isCustom": false,
                    "notes": ""
                    }
                ]
                },
                {
                "_id": "arr-sub-2",
                "name": "Two Pointer",
                "parentFolderId": "6b6351ac6646e06089d88c57",
                "order": 1,
                "children": [],
                "questions": [
                    {
                    "_id": "703aa20814e2980ebd9b6896",
                    "title": "3Sum",
                    "difficulty": "medium",
                    "link": "https://leetcode.com/problems/3sum/",
                    "platform": "leetcode",
                    "isSolved": false,
                    "isCustom": false,
                    "notes": ""
                    }
                ]
                }
            ],
            "questions": [
                {
                "_id": "734ba89f3b2e5ccdaf87478c",
                "title": "Best Time to Buy and Sell Stock",
                "difficulty": "easy",
                "link": "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/",
                "platform": "leetcode",
                "isSolved": false,
                "isCustom": false,
                "notes": ""
                }
            ]
            },

            {
            "_id": "90328228a84a5cfa17ec925d",
            "name": "Strings",
            "parentFolderId": null,
            "order": 1,
            "children": [
                {
                "_id": "str-sub-1",
                "name": "Palindrome",
                "parentFolderId": "90328228a84a5cfa17ec925d",
                "order": 0,
                "children": [],
                "questions": [
                    {
                    "_id": "6e0529b9682356058eeae5c4",
                    "title": "Valid Palindrome",
                    "difficulty": "easy",
                    "link": "https://leetcode.com/problems/valid-palindrome/",
                    "platform": "leetcode",
                    "isSolved": false,
                    "isCustom": false,
                    "notes": ""
                    }
                ]
                }
            ],
            "questions": [
                {
                "_id": "bff48a7e57e12a918501ec9a",
                "title": "Valid Anagram",
                "difficulty": "easy",
                "link": "https://leetcode.com/problems/valid-anagram/",
                "platform": "leetcode",
                "isSolved": false,
                "isCustom": false,
                "notes": ""
                }
            ]
            },

            {
            "_id": "ce3131d195ce52f59daf6e82",
            "name": "Linked List",
            "parentFolderId": null,
            "order": 2,
            "children": [
                {
                "_id": "ll-sub-1",
                "name": "Basic",
                "parentFolderId": "ce3131d195ce52f59daf6e82",
                "order": 0,
                "children": [],
                "questions": [
                    {
                    "_id": "7324ad12829e2c359c6cf259",
                    "title": "Reverse a Linked List",
                    "difficulty": "easy",
                    "link": "https://leetcode.com/problems/reverse-linked-list/",
                    "platform": "leetcode",
                    "isSolved": false,
                    "isCustom": false,
                    "notes": ""
                    }
                ]
                }
            ],
            "questions": []
            },

            {
            "_id": "472ce58df276638b3222773e",
            "name": "Trees",
            "parentFolderId": null,
            "order": 3,
            "children": [
                {
                "_id": "tree-sub-1",
                "name": "BST",
                "parentFolderId": "472ce58df276638b3222773e",
                "order": 0,
                "children": [],
                "questions": [
                    {
                    "_id": "24e758a2d2ebb320cc405efd",
                    "title": "Validate Binary Search Tree",
                    "difficulty": "medium",
                    "link": "https://leetcode.com/problems/validate-binary-search-tree/",
                    "platform": "leetcode",
                    "isSolved": false,
                    "isCustom": false,
                    "notes": ""
                    }
                ]
                },
                {
                "_id": "tree-sub-2",
                "name": "Traversal",
                "parentFolderId": "472ce58df276638b3222773e",
                "order": 1,
                "children": [],
                "questions": [
                    {
                    "_id": "8c67ec2438c1d39fc36dc476",
                    "title": "Binary Tree Level Order Traversal",
                    "difficulty": "medium",
                    "link": "https://leetcode.com/problems/binary-tree-level-order-traversal/",
                    "platform": "leetcode",
                    "isSolved": false,
                    "isCustom": false,
                    "notes": ""
                    }
                ]
                }
            ],
            "questions": []
            },

            {
            "_id": "e5cccf0a9ce1869236cf412b",
            "name": "Graphs",
            "parentFolderId": null,
            "order": 4,
            "children": [
                {
                "_id": "graph-sub-1",
                "name": "DFS / BFS",
                "parentFolderId": "e5cccf0a9ce1869236cf412b",
                "order": 0,
                "children": [],
                "questions": [
                    {
                    "_id": "fb10bcf8e74b9b7d64144fd4",
                    "title": "Number of Islands",
                    "difficulty": "medium",
                    "link": "https://leetcode.com/problems/number-of-islands/",
                    "platform": "leetcode",
                    "isSolved": false,
                    "isCustom": false,
                    "notes": ""
                    }
                ]
                }
            ],
            "questions": []
            }
        ]

    },{
        "sheet": "Striver",
        "tree": [
            {
                "_id": "40f2db917a80a71681a6f332",
                "name": "Step 1: Sorting",
                "parentFolderId": null,
                "order": 0,
                "children": [],
                "questions": [
                    {
                        "_id": "c07fb198e7ae16c6bfd6ce79",
                        "title": "Bubble Sort",
                        "difficulty": "easy",
                        "link": "https://www.geeksforgeeks.org/bubble-sort/",
                        "platform": "gfg",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "efe7fc2021f8942365c3ca4a",
                        "title": "Insertion Sort",
                        "difficulty": "easy",
                        "link": "https://www.geeksforgeeks.org/insertion-sort/",
                        "platform": "gfg",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "3e400b1f5f7f478c49bfc6a3",
                        "title": "Merge Sort",
                        "difficulty": "medium",
                        "link": "https://www.geeksforgeeks.org/merge-sort/",
                        "platform": "gfg",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "a71ed4c2ec6d07f117564373",
                        "title": "Quick Sort",
                        "difficulty": "medium",
                        "link": "https://www.geeksforgeeks.org/quick-sort/",
                        "platform": "gfg",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "247ba3a5c856e6abacf68e8c",
                        "title": "Selection Sort",
                        "difficulty": "easy",
                        "link": "https://www.geeksforgeeks.org/selection-sort/",
                        "platform": "gfg",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    }
                ]
            },
            {
                "_id": "13455c49a3f18c1390fbcf5a",
                "name": "Step 2: Arrays (Easy)",
                "parentFolderId": null,
                "order": 1,
                "children": [],
                "questions": [
                    {
                        "_id": "10c7e0c65ae239d4e2a9633b",
                        "title": "Check if Array is Sorted",
                        "difficulty": "easy",
                        "link": "https://leetcode.com/problems/check-if-array-is-sorted-and-rotated/",
                        "platform": "leetcode",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "f1ee6b1e349d325599962218",
                        "title": "Find Missing Number",
                        "difficulty": "easy",
                        "link": "https://leetcode.com/problems/missing-number/",
                        "platform": "leetcode",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "f5d048be5bd38ecbf68af8a6",
                        "title": "Find Number Appearing Once",
                        "difficulty": "easy",
                        "link": "https://leetcode.com/problems/single-number/",
                        "platform": "leetcode",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "6abde354d8bb169af5d3c240",
                        "title": "Largest Element in Array",
                        "difficulty": "easy",
                        "link": "https://www.geeksforgeeks.org/c-program-find-largest-element-array/",
                        "platform": "gfg",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "5ce4c8e9d682bccd5935f36b",
                        "title": "Left Rotate Array by K Places",
                        "difficulty": "medium",
                        "link": "https://leetcode.com/problems/rotate-array/",
                        "platform": "leetcode",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "2733fdaae86146a7edba854c",
                        "title": "Left Rotate Array by One",
                        "difficulty": "easy",
                        "link": "https://www.geeksforgeeks.org/c-program-cyclically-rotate-array-one/",
                        "platform": "gfg",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "59c4a87e81262ed782f8b769",
                        "title": "Linear Search",
                        "difficulty": "easy",
                        "link": "https://www.geeksforgeeks.org/linear-search/",
                        "platform": "gfg",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "c7e17dc5309118fb30fe3fb5",
                        "title": "Longest Subarray with Sum K",
                        "difficulty": "easy",
                        "link": "https://www.geeksforgeeks.org/longest-sub-array-sum-k/",
                        "platform": "gfg",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "37cb2ee10dc03be33bcac8f9",
                        "title": "Maximum Consecutive Ones",
                        "difficulty": "easy",
                        "link": "https://leetcode.com/problems/max-consecutive-ones/",
                        "platform": "leetcode",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "290afefdf55b695939eb9211",
                        "title": "Move Zeroes",
                        "difficulty": "easy",
                        "link": "https://leetcode.com/problems/move-zeroes/",
                        "platform": "leetcode",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "eedc22105deb480235e4d9f9",
                        "title": "Remove Duplicates from Sorted Array",
                        "difficulty": "easy",
                        "link": "https://leetcode.com/problems/remove-duplicates-from-sorted-array/",
                        "platform": "leetcode",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "110a3e984c3b17c3e077b850",
                        "title": "Second Largest Element",
                        "difficulty": "easy",
                        "link": "https://www.geeksforgeeks.org/find-second-largest-element-array/",
                        "platform": "gfg",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "2e2154e341e6ab5a4b651d38",
                        "title": "Union of Two Sorted Arrays",
                        "difficulty": "easy",
                        "link": "https://www.geeksforgeeks.org/union-and-intersection-of-two-sorted-arrays-2/",
                        "platform": "gfg",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    }
                ]
            },
            {
                "_id": "4e3c71979f2c735d565e1314",
                "name": "Step 3: Arrays (Medium)",
                "parentFolderId": null,
                "order": 2,
                "children": [],
                "questions": [
                    {
                        "_id": "067244f5309fe6ada71da559",
                        "title": "Count Subarrays with Sum K",
                        "difficulty": "medium",
                        "link": "https://leetcode.com/problems/subarray-sum-equals-k/",
                        "platform": "leetcode",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "2a1d2485bb9ffe3e12fa4b5e",
                        "title": "Kadane's Algorithm",
                        "difficulty": "medium",
                        "link": "https://leetcode.com/problems/maximum-subarray/",
                        "platform": "leetcode",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "69e83611a51ad27f3c0ec00a",
                        "title": "Longest Consecutive Sequence",
                        "difficulty": "medium",
                        "link": "https://leetcode.com/problems/longest-consecutive-sequence/",
                        "platform": "leetcode",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "70560302dd3ba9b8f9e3a596",
                        "title": "Majority Element (>n/2)",
                        "difficulty": "easy",
                        "link": "https://leetcode.com/problems/majority-element/",
                        "platform": "leetcode",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "8ff1a34b42c3c39d92ad6529",
                        "title": "Next Permutation",
                        "difficulty": "medium",
                        "link": "https://leetcode.com/problems/next-permutation/",
                        "platform": "leetcode",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "9ad7bfaf75a939e5d1a5cf71",
                        "title": "Rearrange Array Elements by Sign",
                        "difficulty": "medium",
                        "link": "https://leetcode.com/problems/rearrange-array-elements-by-sign/",
                        "platform": "leetcode",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "daff8dacaf6ed6e290713f6d",
                        "title": "Rotate Image",
                        "difficulty": "medium",
                        "link": "https://leetcode.com/problems/rotate-image/",
                        "platform": "leetcode",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "3c3be7139ba2d11f9b37bd14",
                        "title": "Set Matrix Zeroes",
                        "difficulty": "medium",
                        "link": "https://leetcode.com/problems/set-matrix-zeroes/",
                        "platform": "leetcode",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "41d4f6a1874b41c8a6eced89",
                        "title": "Sort Array of 0s 1s 2s",
                        "difficulty": "medium",
                        "link": "https://leetcode.com/problems/sort-colors/",
                        "platform": "leetcode",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "a2080112f84989263e3f5ac1",
                        "title": "Spiral Matrix",
                        "difficulty": "medium",
                        "link": "https://leetcode.com/problems/spiral-matrix/",
                        "platform": "leetcode",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "6a7312ec02e4553b2a5ee284",
                        "title": "Stock Buy and Sell",
                        "difficulty": "easy",
                        "link": "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/",
                        "platform": "leetcode",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "1fc31461423ac09aa1b7de58",
                        "title": "Two Sum",
                        "difficulty": "easy",
                        "link": "https://leetcode.com/problems/two-sum/",
                        "platform": "leetcode",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    }
                ]
            },
            {
                "_id": "97f224ea5a55921b8aab8606",
                "name": "Step 4: Arrays (Hard)",
                "parentFolderId": null,
                "order": 3,
                "children": [],
                "questions": [
                    {
                        "_id": "764cc321533db8cbd016c529",
                        "title": "3Sum",
                        "difficulty": "medium",
                        "link": "https://leetcode.com/problems/3sum/",
                        "platform": "leetcode",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "af51951dc4767908e5bd0b32",
                        "title": "4Sum",
                        "difficulty": "medium",
                        "link": "https://leetcode.com/problems/4sum/",
                        "platform": "leetcode",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "5909a01dac9dc15d74a90cf6",
                        "title": "Count Inversions in Array",
                        "difficulty": "hard",
                        "link": "https://www.geeksforgeeks.org/counting-inversions/",
                        "platform": "gfg",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "f45ce466158b2b9ed23229b1",
                        "title": "Count Subarrays with XOR K",
                        "difficulty": "hard",
                        "link": "https://www.geeksforgeeks.org/count-number-subarrays-given-xor/",
                        "platform": "gfg",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "6a5134eaaf86b173d0adcde8",
                        "title": "Find Missing and Repeating",
                        "difficulty": "medium",
                        "link": "https://www.geeksforgeeks.org/find-a-repeating-and-a-missing-number/",
                        "platform": "gfg",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "0f2a7c65a5f9f0cc6c05793e",
                        "title": "Largest Subarray with 0 Sum",
                        "difficulty": "medium",
                        "link": "https://www.geeksforgeeks.org/find-the-largest-subarray-with-0-sum/",
                        "platform": "gfg",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "f4f33b4100544a7fb9da3ea3",
                        "title": "Majority Element (>n/3)",
                        "difficulty": "medium",
                        "link": "https://leetcode.com/problems/majority-element-ii/",
                        "platform": "leetcode",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "b81e1b5d6b7a120d9be252fa",
                        "title": "Maximum Product Subarray",
                        "difficulty": "medium",
                        "link": "https://leetcode.com/problems/maximum-product-subarray/",
                        "platform": "leetcode",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "eab05d4d597722dd7d3a20ee",
                        "title": "Merge Overlapping Intervals",
                        "difficulty": "medium",
                        "link": "https://leetcode.com/problems/merge-intervals/",
                        "platform": "leetcode",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "eb5754cb2d61e583f82d9f45",
                        "title": "Merge Two Sorted Arrays Without Space",
                        "difficulty": "easy",
                        "link": "https://leetcode.com/problems/merge-sorted-array/",
                        "platform": "leetcode",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "77dba63ef3ae337e0ba09f03",
                        "title": "Pascal's Triangle",
                        "difficulty": "easy",
                        "link": "https://leetcode.com/problems/pascals-triangle/",
                        "platform": "leetcode",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "aaae20c40fd5bb754d2f5616",
                        "title": "Reverse Pairs",
                        "difficulty": "hard",
                        "link": "https://leetcode.com/problems/reverse-pairs/",
                        "platform": "leetcode",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    }
                ]
            },
            {
                "_id": "f05372578a0d1789dac2fb5c",
                "name": "Step 5: Binary Search",
                "parentFolderId": null,
                "order": 4,
                "children": [],
                "questions": [
                    {
                        "_id": "9ecbc007fe8da5f26f454fc4",
                        "title": "Aggressive Cows",
                        "difficulty": "hard",
                        "link": "https://www.geeksforgeeks.org/aggressive-cows/",
                        "platform": "gfg",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "e120b146a90cf066849d3337",
                        "title": "Binary Search",
                        "difficulty": "easy",
                        "link": "https://leetcode.com/problems/binary-search/",
                        "platform": "leetcode",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "b620efb2c0b15ee98df517ef",
                        "title": "Book Allocation Problem",
                        "difficulty": "hard",
                        "link": "https://www.geeksforgeeks.org/allocate-minimum-number-pages/",
                        "platform": "gfg",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "5a4d3d9bbba88149475b4a4d",
                        "title": "Capacity to Ship Packages",
                        "difficulty": "medium",
                        "link": "https://leetcode.com/problems/capacity-to-ship-packages-within-d-days/",
                        "platform": "leetcode",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "aa3cd650084d0d3e1efcd01d",
                        "title": "Find Minimum in Rotated Sorted Array",
                        "difficulty": "medium",
                        "link": "https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/",
                        "platform": "leetcode",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "f42721e723b55c36184d8005",
                        "title": "Find Peak Element",
                        "difficulty": "medium",
                        "link": "https://leetcode.com/problems/find-peak-element/",
                        "platform": "leetcode",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "756e8f5f5d4992cf9e62433e",
                        "title": "Find the Smallest Divisor",
                        "difficulty": "medium",
                        "link": "https://leetcode.com/problems/find-the-smallest-divisor-given-a-threshold/",
                        "platform": "leetcode",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "aca220984227609abbf5aeaf",
                        "title": "First and Last Occurrence",
                        "difficulty": "medium",
                        "link": "https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/",
                        "platform": "leetcode",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "40fe13d7348f193b65607565",
                        "title": "Koko Eating Bananas",
                        "difficulty": "medium",
                        "link": "https://leetcode.com/problems/koko-eating-bananas/",
                        "platform": "leetcode",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "0a20de6ccbbe295be082b18d",
                        "title": "Kth Missing Positive Number",
                        "difficulty": "easy",
                        "link": "https://leetcode.com/problems/kth-missing-positive-number/",
                        "platform": "leetcode",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "b747e580a93e1f008945bb5c",
                        "title": "Median of Two Sorted Arrays",
                        "difficulty": "hard",
                        "link": "https://leetcode.com/problems/median-of-two-sorted-arrays/",
                        "platform": "leetcode",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "832bcf6f982d9f13defbe2e6",
                        "title": "Minimum Days to Make Bouquets",
                        "difficulty": "medium",
                        "link": "https://leetcode.com/problems/minimum-number-of-days-to-make-m-bouquets/",
                        "platform": "leetcode",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "7381cf47e530c627f8eeba48",
                        "title": "Row with Maximum Ones",
                        "difficulty": "easy",
                        "link": "https://www.geeksforgeeks.org/find-the-row-with-maximum-number-1s/",
                        "platform": "gfg",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "d711e02deb5cfcd7b3c5f531",
                        "title": "Search in 2D Matrix",
                        "difficulty": "medium",
                        "link": "https://leetcode.com/problems/search-a-2d-matrix/",
                        "platform": "leetcode",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "0e93a0823e0876f15fc48e26",
                        "title": "Search in 2D Matrix II",
                        "difficulty": "medium",
                        "link": "https://leetcode.com/problems/search-a-2d-matrix-ii/",
                        "platform": "leetcode",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "48299a915cdf905c5e0dd551",
                        "title": "Search in Rotated Sorted Array",
                        "difficulty": "medium",
                        "link": "https://leetcode.com/problems/search-in-rotated-sorted-array/",
                        "platform": "leetcode",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "bb910fdb4e2ad3b9077f5d70",
                        "title": "Search Insert Position",
                        "difficulty": "easy",
                        "link": "https://leetcode.com/problems/search-insert-position/",
                        "platform": "leetcode",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "758bc45208783e3359b20d8e",
                        "title": "Single Element in Sorted Array",
                        "difficulty": "medium",
                        "link": "https://leetcode.com/problems/single-element-in-a-sorted-array/",
                        "platform": "leetcode",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "39f99a0001d00a3818950e8e",
                        "title": "Split Array Largest Sum",
                        "difficulty": "hard",
                        "link": "https://leetcode.com/problems/split-array-largest-sum/",
                        "platform": "leetcode",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    }
                ]
            },
            {
                "_id": "9f7eddfc9a0f42085dfdeac3",
                "name": "Step 6: Strings",
                "parentFolderId": null,
                "order": 5,
                "children": [],
                "questions": [
                    {
                        "_id": "db06ce22ac0fd2db2656b81d",
                        "title": "Check Anagram",
                        "difficulty": "easy",
                        "link": "https://leetcode.com/problems/valid-anagram/",
                        "platform": "leetcode",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "fa644cad48e3c5daee0cf1d0",
                        "title": "Isomorphic Strings",
                        "difficulty": "easy",
                        "link": "https://leetcode.com/problems/isomorphic-strings/",
                        "platform": "leetcode",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "e0c66a1198eb69c96f4eab8f",
                        "title": "Largest Odd Number in String",
                        "difficulty": "easy",
                        "link": "https://leetcode.com/problems/largest-odd-number-in-string/",
                        "platform": "leetcode",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "03e33d885cd5ed2ece348b2b",
                        "title": "Longest Common Prefix",
                        "difficulty": "easy",
                        "link": "https://leetcode.com/problems/longest-common-prefix/",
                        "platform": "leetcode",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "31873e34ec600a813ac3b86b",
                        "title": "Longest Palindromic Substring",
                        "difficulty": "medium",
                        "link": "https://leetcode.com/problems/longest-palindromic-substring/",
                        "platform": "leetcode",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "41013c2b6061d2dcf5385e4b",
                        "title": "Minimum Add to Make Parentheses Valid",
                        "difficulty": "medium",
                        "link": "https://leetcode.com/problems/minimum-add-to-make-parentheses-valid/",
                        "platform": "leetcode",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "ce34535c1cf9bd663d8db567",
                        "title": "Reverse Words in a String",
                        "difficulty": "medium",
                        "link": "https://leetcode.com/problems/reverse-words-in-a-string/",
                        "platform": "leetcode",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "9c392b4ca4c3abb8575f092b",
                        "title": "Roman to Integer",
                        "difficulty": "easy",
                        "link": "https://leetcode.com/problems/roman-to-integer/",
                        "platform": "leetcode",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "5b734270e46edee56d6a937f",
                        "title": "Shortest Palindrome",
                        "difficulty": "hard",
                        "link": "https://leetcode.com/problems/shortest-palindrome/",
                        "platform": "leetcode",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "212bbe657687dd0e4fb1f4de",
                        "title": "Sort Characters by Frequency",
                        "difficulty": "medium",
                        "link": "https://leetcode.com/problems/sort-characters-by-frequency/",
                        "platform": "leetcode",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "614cc676b99f79c52ecb617c",
                        "title": "String to Integer Atoi",
                        "difficulty": "medium",
                        "link": "https://leetcode.com/problems/string-to-integer-atoi/",
                        "platform": "leetcode",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    }
                ]
            },
            {
                "_id": "faef5bdda5dc42986b92517d",
                "name": "Step 7: Linked List",
                "parentFolderId": null,
                "order": 6,
                "children": [],
                "questions": [
                    {
                        "_id": "e97785078fc68157f8e657d4",
                        "title": "Add Two Numbers as Linked List",
                        "difficulty": "medium",
                        "link": "https://leetcode.com/problems/add-two-numbers/",
                        "platform": "leetcode",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "a25f4b4784f08d71d71f4cc0",
                        "title": "Check if Linked List is Palindrome",
                        "difficulty": "easy",
                        "link": "https://leetcode.com/problems/palindrome-linked-list/",
                        "platform": "leetcode",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "202a7cf9c3aa72d82b39d9de",
                        "title": "Clone a Linked List with Random Pointer",
                        "difficulty": "medium",
                        "link": "https://leetcode.com/problems/copy-list-with-random-pointer/",
                        "platform": "leetcode",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "1a1f8781cdc4ea37a067ca5f",
                        "title": "Delete Given Node in Linked List",
                        "difficulty": "medium",
                        "link": "https://leetcode.com/problems/delete-node-in-a-linked-list/",
                        "platform": "leetcode",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "374f2e4b61e40741a18c2e36",
                        "title": "Detect Loop in Linked List",
                        "difficulty": "easy",
                        "link": "https://leetcode.com/problems/linked-list-cycle/",
                        "platform": "leetcode",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "68faf79f256f9b527b5549b0",
                        "title": "Find Middle of Linked List",
                        "difficulty": "easy",
                        "link": "https://leetcode.com/problems/middle-of-the-linked-list/",
                        "platform": "leetcode",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "19c951138dc2d8ca3dcdb9e6",
                        "title": "Find Starting Point of Loop",
                        "difficulty": "medium",
                        "link": "https://leetcode.com/problems/linked-list-cycle-ii/",
                        "platform": "leetcode",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "7db005119dedd6af3e9f60a4",
                        "title": "Flattening a Linked List",
                        "difficulty": "medium",
                        "link": "https://www.geeksforgeeks.org/flattening-a-linked-list/",
                        "platform": "gfg",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "e58956fe711456a42b432829",
                        "title": "Intersection of Two Linked Lists",
                        "difficulty": "easy",
                        "link": "https://leetcode.com/problems/intersection-of-two-linked-lists/",
                        "platform": "leetcode",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "170832ca9a8d7f8aa62d7954",
                        "title": "Merge K Sorted Linked Lists",
                        "difficulty": "hard",
                        "link": "https://leetcode.com/problems/merge-k-sorted-lists/",
                        "platform": "leetcode",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "3848921f1e438626ef791fa3",
                        "title": "Merge Two Sorted Linked Lists",
                        "difficulty": "easy",
                        "link": "https://leetcode.com/problems/merge-two-sorted-lists/",
                        "platform": "leetcode",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "ff3f8c1a39641fa3e052d901",
                        "title": "Remove Nth Node From End",
                        "difficulty": "medium",
                        "link": "https://leetcode.com/problems/remove-nth-node-from-end-of-list/",
                        "platform": "leetcode",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "a88cdc2d92da0e7d322d331f",
                        "title": "Reverse a Linked List",
                        "difficulty": "easy",
                        "link": "https://leetcode.com/problems/reverse-linked-list/",
                        "platform": "leetcode",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "32003b27f84b3c8ec9c21468",
                        "title": "Reverse Linked List in Groups of K",
                        "difficulty": "hard",
                        "link": "https://leetcode.com/problems/reverse-nodes-in-k-group/",
                        "platform": "leetcode",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "48a88c0cd1568ab29d7408ea",
                        "title": "Rotate a Linked List",
                        "difficulty": "medium",
                        "link": "https://leetcode.com/problems/rotate-list/",
                        "platform": "leetcode",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "193b5e9cfab0ee44c12ae6da",
                        "title": "Segregate Odd and Even Nodes",
                        "difficulty": "medium",
                        "link": "https://leetcode.com/problems/odd-even-linked-list/",
                        "platform": "leetcode",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    }
                ]
            },
            {
                "_id": "ab63201fc7983e1cf739722a",
                "name": "Step 8: Greedy Algorithms",
                "parentFolderId": null,
                "order": 7,
                "children": [],
                "questions": [
                    {
                        "_id": "ab64eca54667783405542de9",
                        "title": "Fractional Knapsack",
                        "difficulty": "medium",
                        "link": "https://www.geeksforgeeks.org/fractional-knapsack-problem/",
                        "platform": "gfg",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "39f6afc836491ba00f11bdd9",
                        "title": "Insert Interval",
                        "difficulty": "medium",
                        "link": "https://leetcode.com/problems/insert-interval/",
                        "platform": "leetcode",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "f3707a08c6e9cb832d564f30",
                        "title": "Job Sequencing Problem",
                        "difficulty": "medium",
                        "link": "https://www.geeksforgeeks.org/job-sequencing-problem/",
                        "platform": "gfg",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "6fdda229f125d5f3e6c0875a",
                        "title": "Jump Game I",
                        "difficulty": "medium",
                        "link": "https://leetcode.com/problems/jump-game/",
                        "platform": "leetcode",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "8cbb6c314623645e056f1b35",
                        "title": "Jump Game II",
                        "difficulty": "medium",
                        "link": "https://leetcode.com/problems/jump-game-ii/",
                        "platform": "leetcode",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "839594de662cf9ba68cf633d",
                        "title": "Lemonade Change",
                        "difficulty": "easy",
                        "link": "https://leetcode.com/problems/lemonade-change/",
                        "platform": "leetcode",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "3afca57df8d745a45693b486",
                        "title": "Merge Intervals",
                        "difficulty": "medium",
                        "link": "https://leetcode.com/problems/merge-intervals/",
                        "platform": "leetcode",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "3fee1db96b5cbf9f2acfbae9",
                        "title": "Minimum Platforms",
                        "difficulty": "medium",
                        "link": "https://www.geeksforgeeks.org/minimum-number-platforms-required-railwaybus-station/",
                        "platform": "gfg",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "80998959a2fbf77d0206b361",
                        "title": "N Meetings in One Room",
                        "difficulty": "easy",
                        "link": "https://www.geeksforgeeks.org/n-meetings-in-one-room/",
                        "platform": "gfg",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "0b8ebfb0ee1676364c68fa63",
                        "title": "Non-overlapping Intervals",
                        "difficulty": "medium",
                        "link": "https://leetcode.com/problems/non-overlapping-intervals/",
                        "platform": "leetcode",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "fabf5d49b503cc07c8af4777",
                        "title": "Valid Parenthesis String",
                        "difficulty": "medium",
                        "link": "https://leetcode.com/problems/valid-parenthesis-string/",
                        "platform": "leetcode",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    }
                ]
            },
            {
                "_id": "f582589a248d7ebe50cd4798",
                "name": "Step 9: Recursion & Backtracking",
                "parentFolderId": null,
                "order": 8,
                "children": [],
                "questions": [
                    {
                        "_id": "f8d4a091fb0b703dfc42f809",
                        "title": "Combination Sum I",
                        "difficulty": "medium",
                        "link": "https://leetcode.com/problems/combination-sum/",
                        "platform": "leetcode",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "f547e2279e2401d34a3421e9",
                        "title": "Combination Sum II",
                        "difficulty": "medium",
                        "link": "https://leetcode.com/problems/combination-sum-ii/",
                        "platform": "leetcode",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "0455096e4ae12ccc5414ae6c",
                        "title": "Combination Sum III",
                        "difficulty": "medium",
                        "link": "https://leetcode.com/problems/combination-sum-iii/",
                        "platform": "leetcode",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "584778496db0831d6f72cb64",
                        "title": "Fibonacci Number",
                        "difficulty": "easy",
                        "link": "https://leetcode.com/problems/fibonacci-number/",
                        "platform": "leetcode",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "64df105d0ed7d3e0904258d0",
                        "title": "Generate Parentheses",
                        "difficulty": "medium",
                        "link": "https://leetcode.com/problems/generate-parentheses/",
                        "platform": "leetcode",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "27c57dfd71be5ab58a76e9fa",
                        "title": "K-th Permutation Sequence",
                        "difficulty": "hard",
                        "link": "https://leetcode.com/problems/permutation-sequence/",
                        "platform": "leetcode",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "c248f095f80a21b3332597c5",
                        "title": "M Coloring Problem",
                        "difficulty": "hard",
                        "link": "https://www.geeksforgeeks.org/m-coloring-problem-backtracking-5/",
                        "platform": "gfg",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "0822948e1056b4f43c3a6663",
                        "title": "N-Queens",
                        "difficulty": "hard",
                        "link": "https://leetcode.com/problems/n-queens/",
                        "platform": "leetcode",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "602ebff3bfb10cbd4449caa0",
                        "title": "Palindrome Partitioning",
                        "difficulty": "medium",
                        "link": "https://leetcode.com/problems/palindrome-partitioning/",
                        "platform": "leetcode",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "92edaed5cf79897e766bf828",
                        "title": "Permutation I",
                        "difficulty": "medium",
                        "link": "https://leetcode.com/problems/permutations/",
                        "platform": "leetcode",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "4ff06fcf7acb9578ec2e47f2",
                        "title": "Permutation II (With Duplicates)",
                        "difficulty": "medium",
                        "link": "https://leetcode.com/problems/permutations-ii/",
                        "platform": "leetcode",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "eaef1e5c572c5db072508164",
                        "title": "Power Function",
                        "difficulty": "medium",
                        "link": "https://leetcode.com/problems/powx-n/",
                        "platform": "leetcode",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "049c7150f4bd0ac85b9db200",
                        "title": "Power Set / All Subsequences",
                        "difficulty": "medium",
                        "link": "https://leetcode.com/problems/subsets/",
                        "platform": "leetcode",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "380fdc9baeb1c34c078aef06",
                        "title": "Rat in a Maze",
                        "difficulty": "medium",
                        "link": "https://www.geeksforgeeks.org/rat-in-a-maze-backtracking-2/",
                        "platform": "gfg",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "22120935a80acc1cb17253d4",
                        "title": "Subset Sum II (No Duplicates)",
                        "difficulty": "medium",
                        "link": "https://leetcode.com/problems/subsets-ii/",
                        "platform": "leetcode",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "2efcc385890c3f83260cae30",
                        "title": "Sudoku Solver",
                        "difficulty": "hard",
                        "link": "https://leetcode.com/problems/sudoku-solver/",
                        "platform": "leetcode",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "82778dea01d59e6b6bd23537",
                        "title": "Word Break II",
                        "difficulty": "hard",
                        "link": "https://leetcode.com/problems/word-break-ii/",
                        "platform": "leetcode",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "e953774c97fbdfa79d944d17",
                        "title": "Word Search",
                        "difficulty": "medium",
                        "link": "https://leetcode.com/problems/word-search/",
                        "platform": "leetcode",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    }
                ]
            },
            {
                "_id": "456a8a83291c7333fb57c557",
                "name": "Step 10: Stack & Queue",
                "parentFolderId": null,
                "order": 9,
                "children": [],
                "questions": [
                    {
                        "_id": "5a74bb6867a6a997fe8c8266",
                        "title": "Asteroid Collision",
                        "difficulty": "medium",
                        "link": "https://leetcode.com/problems/asteroid-collision/",
                        "platform": "leetcode",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "bea6f797169e826da0c9d5b9",
                        "title": "Check for Balanced Parentheses",
                        "difficulty": "easy",
                        "link": "https://leetcode.com/problems/valid-parentheses/",
                        "platform": "leetcode",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "2c4c44ca71d0391f0a24c171",
                        "title": "Implement Min Stack",
                        "difficulty": "medium",
                        "link": "https://leetcode.com/problems/min-stack/",
                        "platform": "leetcode",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "a49df84017fdafec8a8582b7",
                        "title": "Implement Queue Using Stack",
                        "difficulty": "easy",
                        "link": "https://leetcode.com/problems/implement-queue-using-stacks/",
                        "platform": "leetcode",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "d5ade045861bec4facea6c0d",
                        "title": "Implement Stack Using Queue",
                        "difficulty": "easy",
                        "link": "https://leetcode.com/problems/implement-stack-using-queues/",
                        "platform": "leetcode",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "63e0258ea921c85097157f44",
                        "title": "Largest Rectangle in Histogram",
                        "difficulty": "hard",
                        "link": "https://leetcode.com/problems/largest-rectangle-in-histogram/",
                        "platform": "leetcode",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "f2adba09adfd7c4a5fdd0630",
                        "title": "LFU Cache",
                        "difficulty": "hard",
                        "link": "https://leetcode.com/problems/lfu-cache/",
                        "platform": "leetcode",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "c2a279a1132f5516b7580180",
                        "title": "LRU Cache",
                        "difficulty": "medium",
                        "link": "https://leetcode.com/problems/lru-cache/",
                        "platform": "leetcode",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "cd8e8da27f77c3637f2544d9",
                        "title": "Maximal Rectangle",
                        "difficulty": "hard",
                        "link": "https://leetcode.com/problems/maximal-rectangle/",
                        "platform": "leetcode",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "7a451f701e22234c9b841ef2",
                        "title": "Next Greater Element",
                        "difficulty": "easy",
                        "link": "https://leetcode.com/problems/next-greater-element-i/",
                        "platform": "leetcode",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "8600c6188e1d964631ee007b",
                        "title": "Next Greater Element II (Circular)",
                        "difficulty": "medium",
                        "link": "https://leetcode.com/problems/next-greater-element-ii/",
                        "platform": "leetcode",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "2d86b7a1dfd958d4f67e27e5",
                        "title": "Remove K Digits",
                        "difficulty": "medium",
                        "link": "https://leetcode.com/problems/remove-k-digits/",
                        "platform": "leetcode",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "2559d06279e7a2dc1a11e4d2",
                        "title": "Sliding Window Maximum",
                        "difficulty": "hard",
                        "link": "https://leetcode.com/problems/sliding-window-maximum/",
                        "platform": "leetcode",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "140feba81ce7405c346e6b38",
                        "title": "Stock Span Problem",
                        "difficulty": "medium",
                        "link": "https://leetcode.com/problems/online-stock-span/",
                        "platform": "leetcode",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "2e589255eb11c6e32427aa1e",
                        "title": "Sum of Subarray Minimums",
                        "difficulty": "medium",
                        "link": "https://leetcode.com/problems/sum-of-subarray-minimums/",
                        "platform": "leetcode",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "ad5b6c48e97b401161b352dd",
                        "title": "The Celebrity Problem",
                        "difficulty": "medium",
                        "link": "https://www.geeksforgeeks.org/the-celebrity-problem/",
                        "platform": "gfg",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    }
                ]
            },
            {
                "_id": "242aa0f4c606880675cbd23a",
                "name": "Step 11: Heap / Priority Queue",
                "parentFolderId": null,
                "order": 10,
                "children": [],
                "questions": [
                    {
                        "_id": "b77accd6a8f412bc5d18d642",
                        "title": "Connect N Ropes with Minimum Cost",
                        "difficulty": "medium",
                        "link": "https://www.geeksforgeeks.org/connect-n-ropes-minimum-cost/",
                        "platform": "gfg",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "f087d481bad7b567778f0f09",
                        "title": "Design Twitter",
                        "difficulty": "medium",
                        "link": "https://leetcode.com/problems/design-twitter/",
                        "platform": "leetcode",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "82db1ef7b64c151b4e6c1e95",
                        "title": "Find Median from Data Stream",
                        "difficulty": "hard",
                        "link": "https://leetcode.com/problems/find-median-from-data-stream/",
                        "platform": "leetcode",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "a649d0228c33ad6acc19ea37",
                        "title": "K Most Frequent Elements",
                        "difficulty": "medium",
                        "link": "https://leetcode.com/problems/top-k-frequent-elements/",
                        "platform": "leetcode",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "4a160f83939252dd9ed74654",
                        "title": "Kth Largest Element",
                        "difficulty": "medium",
                        "link": "https://leetcode.com/problems/kth-largest-element-in-an-array/",
                        "platform": "leetcode",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "3dd49cf2fb95cc03a9923fff",
                        "title": "Kth Largest Element in Stream",
                        "difficulty": "easy",
                        "link": "https://leetcode.com/problems/kth-largest-element-in-a-stream/",
                        "platform": "leetcode",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "08455a0b61902407be87c958",
                        "title": "Kth Smallest Element in Matrix",
                        "difficulty": "medium",
                        "link": "https://leetcode.com/problems/kth-smallest-element-in-a-sorted-matrix/",
                        "platform": "leetcode",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "aa71c24e855df58e81c124e3",
                        "title": "Task Scheduler",
                        "difficulty": "medium",
                        "link": "https://leetcode.com/problems/task-scheduler/",
                        "platform": "leetcode",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    }
                ]
            },
            {
                "_id": "f2acafe927e528d6a4e99dcc",
                "name": "Step 12: Trees",
                "parentFolderId": null,
                "order": 11,
                "children": [],
                "questions": [
                    {
                        "_id": "ad66e889b79132a1ac31abd1",
                        "title": "Bottom View of Binary Tree",
                        "difficulty": "medium",
                        "link": "https://www.geeksforgeeks.org/bottom-view-binary-tree/",
                        "platform": "gfg",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "b2b322505fd66b9bf6a927b9",
                        "title": "Boundary Traversal",
                        "difficulty": "medium",
                        "link": "https://www.geeksforgeeks.org/boundary-traversal-of-binary-tree/",
                        "platform": "gfg",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "9543597b41dcffadddfebd0c",
                        "title": "BST Iterator",
                        "difficulty": "medium",
                        "link": "https://leetcode.com/problems/binary-search-tree-iterator/",
                        "platform": "leetcode",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "4a3a3a3a50260a5e1422b472",
                        "title": "Check Identical Trees",
                        "difficulty": "easy",
                        "link": "https://leetcode.com/problems/same-tree/",
                        "platform": "leetcode",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "ae9f55eb4c48c799ce705270",
                        "title": "Check if Tree is Balanced",
                        "difficulty": "easy",
                        "link": "https://leetcode.com/problems/balanced-binary-tree/",
                        "platform": "leetcode",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "0cb8d6e0d26e15c41560c15b",
                        "title": "Check Symmetry",
                        "difficulty": "easy",
                        "link": "https://leetcode.com/problems/symmetric-tree/",
                        "platform": "leetcode",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "b0f8035f29b04a13eddae047",
                        "title": "Construct Binary Tree from Inorder and Postorder",
                        "difficulty": "medium",
                        "link": "https://leetcode.com/problems/construct-binary-tree-from-inorder-and-postorder-traversal/",
                        "platform": "leetcode",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "0e2746402cefe7e906ef794b",
                        "title": "Construct Binary Tree from Preorder and Inorder",
                        "difficulty": "medium",
                        "link": "https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/",
                        "platform": "leetcode",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "2e72f62e2f207e63f54e7eaf",
                        "title": "Construct BST from Preorder",
                        "difficulty": "medium",
                        "link": "https://leetcode.com/problems/construct-binary-search-tree-from-preorder-traversal/",
                        "platform": "leetcode",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "3ede1f77834a81892f283d2f",
                        "title": "Count Total Nodes in Complete Binary Tree",
                        "difficulty": "easy",
                        "link": "https://leetcode.com/problems/count-complete-tree-nodes/",
                        "platform": "leetcode",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "316068f65d480cec5822db08",
                        "title": "Delete in BST",
                        "difficulty": "medium",
                        "link": "https://leetcode.com/problems/delete-node-in-a-bst/",
                        "platform": "leetcode",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "c75aaf1cd70acd6cd58d962a",
                        "title": "Diameter of Binary Tree",
                        "difficulty": "easy",
                        "link": "https://leetcode.com/problems/diameter-of-binary-tree/",
                        "platform": "leetcode",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "f95141b98c7d348269c431d3",
                        "title": "Flatten Binary Tree to Linked List",
                        "difficulty": "medium",
                        "link": "https://leetcode.com/problems/flatten-binary-tree-to-linked-list/",
                        "platform": "leetcode",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "d63b8d29f1ff0adf091425c5",
                        "title": "Height of Binary Tree",
                        "difficulty": "easy",
                        "link": "https://leetcode.com/problems/maximum-depth-of-binary-tree/",
                        "platform": "leetcode",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "d22d90a24b7cdb54e86a4cd8",
                        "title": "Implement Trie",
                        "difficulty": "medium",
                        "link": "https://leetcode.com/problems/implement-trie-prefix-tree/",
                        "platform": "leetcode",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "87a6d0733a7bfc374b55fdb0",
                        "title": "Inorder Successor in BST",
                        "difficulty": "medium",
                        "link": "https://www.geeksforgeeks.org/inorder-successor-in-binary-search-tree/",
                        "platform": "gfg",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "a15a9dfbb9bec0f0d2244bd3",
                        "title": "Inorder Traversal",
                        "difficulty": "easy",
                        "link": "https://leetcode.com/problems/binary-tree-inorder-traversal/",
                        "platform": "leetcode",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "6e12298d8bbd2267e99f9517",
                        "title": "Insert in BST",
                        "difficulty": "medium",
                        "link": "https://leetcode.com/problems/insert-into-a-binary-search-tree/",
                        "platform": "leetcode",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "0ca841d0cd6db6b4d955c551",
                        "title": "Kth Smallest in BST",
                        "difficulty": "medium",
                        "link": "https://leetcode.com/problems/kth-smallest-element-in-a-bst/",
                        "platform": "leetcode",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "eec77ab71578ce536959162a",
                        "title": "Largest BST in Binary Tree",
                        "difficulty": "hard",
                        "link": "https://www.geeksforgeeks.org/largest-bst-binary-tree/",
                        "platform": "gfg",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "1822601b4561f7143c5ac3f0",
                        "title": "LCA in BST",
                        "difficulty": "medium",
                        "link": "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/",
                        "platform": "leetcode",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "f6f71b4d3ed29f98fff0bdc3",
                        "title": "Level Order Traversal",
                        "difficulty": "medium",
                        "link": "https://leetcode.com/problems/binary-tree-level-order-traversal/",
                        "platform": "leetcode",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "696bd19e5fba8ab331cb5876",
                        "title": "Maximum Path Sum",
                        "difficulty": "hard",
                        "link": "https://leetcode.com/problems/binary-tree-maximum-path-sum/",
                        "platform": "leetcode",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "8d4edb65379b72d24cfce7f0",
                        "title": "Maximum XOR of Two Numbers",
                        "difficulty": "medium",
                        "link": "https://leetcode.com/problems/maximum-xor-of-two-numbers-in-an-array/",
                        "platform": "leetcode",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "84f2c241eb24b4ad889d0f24",
                        "title": "Maximum XOR with Element from Array",
                        "difficulty": "hard",
                        "link": "https://leetcode.com/problems/maximum-xor-with-an-element-from-array/",
                        "platform": "leetcode",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "251d7e6810b5cd113123a46e",
                        "title": "Postorder Traversal",
                        "difficulty": "easy",
                        "link": "https://leetcode.com/problems/binary-tree-postorder-traversal/",
                        "platform": "leetcode",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "d5b9068cd0f92a9bfe1446c1",
                        "title": "Preorder Traversal",
                        "difficulty": "easy",
                        "link": "https://leetcode.com/problems/binary-tree-preorder-traversal/",
                        "platform": "leetcode",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "740320d5875917a3084ad505",
                        "title": "Print All Nodes at Distance K",
                        "difficulty": "medium",
                        "link": "https://leetcode.com/problems/all-nodes-distance-k-in-binary-tree/",
                        "platform": "leetcode",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "562e52c5d9d71760678d2114",
                        "title": "Recover BST",
                        "difficulty": "medium",
                        "link": "https://leetcode.com/problems/recover-binary-search-tree/",
                        "platform": "leetcode",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "742b9d1b1df0806d19244046",
                        "title": "Right Side View",
                        "difficulty": "medium",
                        "link": "https://leetcode.com/problems/binary-tree-right-side-view/",
                        "platform": "leetcode",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "0e177fb612b780b586c017d3",
                        "title": "Search in BST",
                        "difficulty": "easy",
                        "link": "https://leetcode.com/problems/search-in-a-binary-search-tree/",
                        "platform": "leetcode",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "cf8d9087bdba4ec99a72714a",
                        "title": "Serialize and Deserialize Binary Tree",
                        "difficulty": "hard",
                        "link": "https://leetcode.com/problems/serialize-and-deserialize-binary-tree/",
                        "platform": "leetcode",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "de70de49b349ca7cd4995ba8",
                        "title": "Top View of Binary Tree",
                        "difficulty": "medium",
                        "link": "https://www.geeksforgeeks.org/print-nodes-top-view-binary-tree/",
                        "platform": "gfg",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "175295144785a1373140a46e",
                        "title": "Two Sum in BST",
                        "difficulty": "easy",
                        "link": "https://leetcode.com/problems/two-sum-iv-input-is-a-bst/",
                        "platform": "leetcode",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "03ad6fbd56a69f7da9bffe75",
                        "title": "Validate BST",
                        "difficulty": "medium",
                        "link": "https://leetcode.com/problems/validate-binary-search-tree/",
                        "platform": "leetcode",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "d524c343aa5bc219ce184dae",
                        "title": "Vertical Order Traversal",
                        "difficulty": "hard",
                        "link": "https://leetcode.com/problems/vertical-order-traversal-of-a-binary-tree/",
                        "platform": "leetcode",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "429dbe9304fbd36fe87df145",
                        "title": "Zigzag Level Order Traversal",
                        "difficulty": "medium",
                        "link": "https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal/",
                        "platform": "leetcode",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    }
                ]
            },
            {
                "_id": "c8ef9ce76063acbbba606966",
                "name": "Step 13: Graphs",
                "parentFolderId": null,
                "order": 12,
                "children": [],
                "questions": [
                    {
                        "_id": "06d2c0d42221b5f077dc76ce",
                        "title": "01 Matrix (Distance of Nearest 1)",
                        "difficulty": "medium",
                        "link": "https://leetcode.com/problems/01-matrix/",
                        "platform": "leetcode",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "8057a9239910ba1e8207141b",
                        "title": "Accounts Merge",
                        "difficulty": "medium",
                        "link": "https://leetcode.com/problems/accounts-merge/",
                        "platform": "leetcode",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "a711b36d1c2099b7e573a161",
                        "title": "Alien Dictionary",
                        "difficulty": "hard",
                        "link": "https://www.geeksforgeeks.org/given-sorted-dictionary-find-precedence-characters/",
                        "platform": "gfg",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "d762f34ea8fe92e420071cec",
                        "title": "Articulation Points",
                        "difficulty": "hard",
                        "link": "https://www.geeksforgeeks.org/articulation-points-or-cut-vertices-in-a-graph/",
                        "platform": "gfg",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "8ee18d8cb1f6b0d373b8dcff",
                        "title": "Bellman-Ford Algorithm",
                        "difficulty": "medium",
                        "link": "https://www.geeksforgeeks.org/bellman-ford-algorithm-dp-23/",
                        "platform": "gfg",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "a3d53c46336d47439b551157",
                        "title": "BFS Traversal",
                        "difficulty": "easy",
                        "link": "https://www.geeksforgeeks.org/breadth-first-search-or-bfs-for-a-graph/",
                        "platform": "gfg",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "7491998080b006df6ca39db6",
                        "title": "Bipartite Check",
                        "difficulty": "medium",
                        "link": "https://leetcode.com/problems/is-graph-bipartite/",
                        "platform": "leetcode",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "22eb2f446aa1bf1fdcbc3d76",
                        "title": "Cheapest Flights Within K Stops",
                        "difficulty": "medium",
                        "link": "https://leetcode.com/problems/cheapest-flights-within-k-stops/",
                        "platform": "leetcode",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "4796b9613e53a0ab682f638b",
                        "title": "Course Schedule I",
                        "difficulty": "medium",
                        "link": "https://leetcode.com/problems/course-schedule/",
                        "platform": "leetcode",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "df9f2c6c7c22169a7f84ca82",
                        "title": "Course Schedule II",
                        "difficulty": "medium",
                        "link": "https://leetcode.com/problems/course-schedule-ii/",
                        "platform": "leetcode",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "08d9dad0f9bcaea6d1be6223",
                        "title": "Critical Connections (Bridges)",
                        "difficulty": "hard",
                        "link": "https://leetcode.com/problems/critical-connections-in-a-network/",
                        "platform": "leetcode",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "3d25aa36994f0992c4dc2b74",
                        "title": "Detect Cycle in Directed Graph (DFS)",
                        "difficulty": "medium",
                        "link": "https://www.geeksforgeeks.org/detect-cycle-in-a-graph/",
                        "platform": "gfg",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "a1e69e5e8278d88c45dac99b",
                        "title": "Detect Cycle in Undirected Graph",
                        "difficulty": "medium",
                        "link": "https://www.geeksforgeeks.org/detect-cycle-undirected-graph/",
                        "platform": "gfg",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "05a23d457cc9fe9e9dc94f71",
                        "title": "DFS Traversal",
                        "difficulty": "easy",
                        "link": "https://www.geeksforgeeks.org/depth-first-search-or-dfs-for-a-graph/",
                        "platform": "gfg",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "2015979d026628208d9bf82d",
                        "title": "Dijkstra's Algorithm",
                        "difficulty": "medium",
                        "link": "https://www.geeksforgeeks.org/dijkstras-shortest-path-algorithm-greedy-algo-7/",
                        "platform": "gfg",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "445cae4cb4ea2c97819eaca4",
                        "title": "Find City with Smallest Neighbours",
                        "difficulty": "medium",
                        "link": "https://leetcode.com/problems/find-the-city-with-the-smallest-number-of-neighbors-at-a-threshold-distance/",
                        "platform": "leetcode",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "17f6e7f84b061d71b47a662a",
                        "title": "Find Eventual Safe States",
                        "difficulty": "medium",
                        "link": "https://leetcode.com/problems/find-eventual-safe-states/",
                        "platform": "leetcode",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "37915f3a1c965deb7aa497f1",
                        "title": "Flood Fill",
                        "difficulty": "easy",
                        "link": "https://leetcode.com/problems/flood-fill/",
                        "platform": "leetcode",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "593b05b65e6f98af69dc81ef",
                        "title": "Floyd Warshall Algorithm",
                        "difficulty": "medium",
                        "link": "https://www.geeksforgeeks.org/floyd-warshall-algorithm-dp-16/",
                        "platform": "gfg",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "f2797dfc50634f6181309684",
                        "title": "Making a Large Island",
                        "difficulty": "hard",
                        "link": "https://leetcode.com/problems/making-a-large-island/",
                        "platform": "leetcode",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "2dd9035c1dbb0ffcdb8eaaa8",
                        "title": "Minimum Spanning Tree (Kruskal's)",
                        "difficulty": "medium",
                        "link": "https://www.geeksforgeeks.org/kruskals-minimum-spanning-tree-algorithm-greedy-algo-2/",
                        "platform": "gfg",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "dad68654e5c86e8667ec3954",
                        "title": "Minimum Spanning Tree (Prim's)",
                        "difficulty": "medium",
                        "link": "https://www.geeksforgeeks.org/prims-minimum-spanning-tree-mst-greedy-algo-5/",
                        "platform": "gfg",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "a0422f4301c801b010e7dbb4",
                        "title": "Most Stones Removed",
                        "difficulty": "medium",
                        "link": "https://leetcode.com/problems/most-stones-removed-with-same-row-or-column/",
                        "platform": "leetcode",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "83f0f508d75af1fa2579ef19",
                        "title": "Number of Enclaves",
                        "difficulty": "medium",
                        "link": "https://leetcode.com/problems/number-of-enclaves/",
                        "platform": "leetcode",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "3f732fd03916dc8c95108440",
                        "title": "Number of Islands",
                        "difficulty": "medium",
                        "link": "https://leetcode.com/problems/number-of-islands/",
                        "platform": "leetcode",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "d5577d80e61b0dcd80a75036",
                        "title": "Number of Operations to Connect Network",
                        "difficulty": "medium",
                        "link": "https://leetcode.com/problems/number-of-operations-to-make-network-connected/",
                        "platform": "leetcode",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "27cf43a569c57d63766a46ea",
                        "title": "Number of Provinces",
                        "difficulty": "medium",
                        "link": "https://leetcode.com/problems/number-of-provinces/",
                        "platform": "leetcode",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "5993161b256905a0bf307937",
                        "title": "Number of Ways to Arrive at Destination",
                        "difficulty": "medium",
                        "link": "https://leetcode.com/problems/number-of-ways-to-arrive-at-destination/",
                        "platform": "leetcode",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "d0aaabf0b3ca1e3a262ef5ea",
                        "title": "Path with Minimum Effort",
                        "difficulty": "medium",
                        "link": "https://leetcode.com/problems/path-with-minimum-effort/",
                        "platform": "leetcode",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "283951a7559e3d2e10488962",
                        "title": "Rotten Oranges",
                        "difficulty": "medium",
                        "link": "https://leetcode.com/problems/rotting-oranges/",
                        "platform": "leetcode",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "b4ba6b762477b778636f93b3",
                        "title": "Shortest Path in Binary Matrix",
                        "difficulty": "medium",
                        "link": "https://leetcode.com/problems/shortest-path-in-binary-matrix/",
                        "platform": "leetcode",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "fde9a9a52d2abe290a926713",
                        "title": "Shortest Path in DAG",
                        "difficulty": "medium",
                        "link": "https://www.geeksforgeeks.org/shortest-path-for-directed-acyclic-graphs/",
                        "platform": "gfg",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "9ba884b0dbaaccd9e1eec720",
                        "title": "Strongly Connected Components (Kosaraju's)",
                        "difficulty": "hard",
                        "link": "https://www.geeksforgeeks.org/strongly-connected-components/",
                        "platform": "gfg",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "155197bdcb53214f8db19229",
                        "title": "Surrounded Regions",
                        "difficulty": "medium",
                        "link": "https://leetcode.com/problems/surrounded-regions/",
                        "platform": "leetcode",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "017a861e150319b18fc93c4a",
                        "title": "Swim in Rising Water",
                        "difficulty": "hard",
                        "link": "https://leetcode.com/problems/swim-in-rising-water/",
                        "platform": "leetcode",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "49fb1391cab1b599b0bdadcd",
                        "title": "Topological Sort (DFS)",
                        "difficulty": "medium",
                        "link": "https://www.geeksforgeeks.org/topological-sorting/",
                        "platform": "gfg",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "2130403136bc91556eb52e49",
                        "title": "Topological Sort (Kahn's Algorithm)",
                        "difficulty": "medium",
                        "link": "https://www.geeksforgeeks.org/topological-sorting-indegree-based-solution/",
                        "platform": "gfg",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "34fcbf2105929ec48b76e5e5",
                        "title": "Word Ladder I",
                        "difficulty": "hard",
                        "link": "https://leetcode.com/problems/word-ladder/",
                        "platform": "leetcode",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "ed42e5b820f04fc0d10c0adc",
                        "title": "Word Ladder II",
                        "difficulty": "hard",
                        "link": "https://leetcode.com/problems/word-ladder-ii/",
                        "platform": "leetcode",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    }
                ]
            },
            {
                "_id": "44b92936e65a5a98418df8bb",
                "name": "Step 14: Dynamic Programming",
                "parentFolderId": null,
                "order": 13,
                "children": [],
                "questions": [
                    {
                        "_id": "b185238aded207547639a168",
                        "title": "0/1 Knapsack",
                        "difficulty": "medium",
                        "link": "https://www.geeksforgeeks.org/0-1-knapsack-problem-dp-10/",
                        "platform": "gfg",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "65a0c1b4114c7aeb9ba97971",
                        "title": "Burst Balloons",
                        "difficulty": "hard",
                        "link": "https://leetcode.com/problems/burst-balloons/",
                        "platform": "leetcode",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "9bec4b602aeb004ec9109a07",
                        "title": "Climbing Stairs",
                        "difficulty": "easy",
                        "link": "https://leetcode.com/problems/climbing-stairs/",
                        "platform": "leetcode",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "ae3d40fbaa7adbdd03489ec5",
                        "title": "Coin Change (Min Coins)",
                        "difficulty": "medium",
                        "link": "https://leetcode.com/problems/coin-change/",
                        "platform": "leetcode",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "7a72285480f5b1b882d27e64",
                        "title": "Coin Change 2 (Count Ways)",
                        "difficulty": "medium",
                        "link": "https://leetcode.com/problems/coin-change-ii/",
                        "platform": "leetcode",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "102156790d8cc3b46c087471",
                        "title": "Count Square Submatrices",
                        "difficulty": "medium",
                        "link": "https://leetcode.com/problems/count-square-submatrices-with-all-ones/",
                        "platform": "leetcode",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "050d3fdc6d8897189f5b6bcc",
                        "title": "Distinct Subsequences",
                        "difficulty": "hard",
                        "link": "https://leetcode.com/problems/distinct-subsequences/",
                        "platform": "leetcode",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "ca0b947a645e6a71b4e6454d",
                        "title": "Edit Distance",
                        "difficulty": "hard",
                        "link": "https://leetcode.com/problems/edit-distance/",
                        "platform": "leetcode",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "e447b0a310e260198f2c61ef",
                        "title": "Frog Jump",
                        "difficulty": "easy",
                        "link": "https://www.geeksforgeeks.org/minimum-cost-reach-nth-floor/",
                        "platform": "gfg",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "fb38ddd2de34ba7f8b64f8ff",
                        "title": "Grid Unique Paths",
                        "difficulty": "medium",
                        "link": "https://leetcode.com/problems/unique-paths/",
                        "platform": "leetcode",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "4d317ffa3e1977b35f5b2dad",
                        "title": "Grid Unique Paths II",
                        "difficulty": "medium",
                        "link": "https://leetcode.com/problems/unique-paths-ii/",
                        "platform": "leetcode",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "0390045b43c3a21e7faa33be",
                        "title": "House Robber",
                        "difficulty": "medium",
                        "link": "https://leetcode.com/problems/house-robber/",
                        "platform": "leetcode",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "ce631d5ae70e86cc123f8b38",
                        "title": "House Robber II",
                        "difficulty": "medium",
                        "link": "https://leetcode.com/problems/house-robber-ii/",
                        "platform": "leetcode",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "43d3dee19989a6c3e5268ac4",
                        "title": "Largest Divisible Subset",
                        "difficulty": "medium",
                        "link": "https://leetcode.com/problems/largest-divisible-subset/",
                        "platform": "leetcode",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "89ef84e7cbafc65f13b050e8",
                        "title": "Longest Common Subsequence",
                        "difficulty": "medium",
                        "link": "https://leetcode.com/problems/longest-common-subsequence/",
                        "platform": "leetcode",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "fc8ffeba8ecf4d2ac5c8ad07",
                        "title": "Longest Common Substring",
                        "difficulty": "medium",
                        "link": "https://www.geeksforgeeks.org/longest-common-substring-dp-29/",
                        "platform": "gfg",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "3ef3de4838c13a0210d0ab4f",
                        "title": "Longest Increasing Subsequence",
                        "difficulty": "medium",
                        "link": "https://leetcode.com/problems/longest-increasing-subsequence/",
                        "platform": "leetcode",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "0aa7d1a4c9677c514e63060c",
                        "title": "Longest Palindromic Subsequence",
                        "difficulty": "medium",
                        "link": "https://leetcode.com/problems/longest-palindromic-subsequence/",
                        "platform": "leetcode",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "0818ec2fabc93286e921236c",
                        "title": "Longest String Chain",
                        "difficulty": "medium",
                        "link": "https://leetcode.com/problems/longest-string-chain/",
                        "platform": "leetcode",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "7edff9a54229efc8e114f4bd",
                        "title": "Matrix Chain Multiplication",
                        "difficulty": "hard",
                        "link": "https://www.geeksforgeeks.org/matrix-chain-multiplication-dp-8/",
                        "platform": "gfg",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "2c99cea92c9c40f58e89e054",
                        "title": "Maximal Rectangle",
                        "difficulty": "hard",
                        "link": "https://leetcode.com/problems/maximal-rectangle/",
                        "platform": "leetcode",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "43c49cee40410f7877871a19",
                        "title": "Minimum Cost to Cut the Stick",
                        "difficulty": "hard",
                        "link": "https://leetcode.com/problems/minimum-cost-to-cut-a-stick/",
                        "platform": "leetcode",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "41dc98fa93a8954f13f85296",
                        "title": "Minimum Falling Path Sum",
                        "difficulty": "medium",
                        "link": "https://leetcode.com/problems/minimum-falling-path-sum/",
                        "platform": "leetcode",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "dc65e886c335dc80205c3b1b",
                        "title": "Minimum Insertions to Make Palindrome",
                        "difficulty": "hard",
                        "link": "https://leetcode.com/problems/minimum-insertion-steps-to-make-a-string-palindrome/",
                        "platform": "leetcode",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "84c4968d23937322e63a57b6",
                        "title": "Minimum Path Sum in Grid",
                        "difficulty": "medium",
                        "link": "https://leetcode.com/problems/minimum-path-sum/",
                        "platform": "leetcode",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "dcee1a667f35edb49a2ddaf9",
                        "title": "Number of Longest Increasing Subsequences",
                        "difficulty": "medium",
                        "link": "https://leetcode.com/problems/number-of-longest-increasing-subsequence/",
                        "platform": "leetcode",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "c9d3555b73d29e47ba26e445",
                        "title": "Palindrome Partitioning (Min Cuts)",
                        "difficulty": "hard",
                        "link": "https://leetcode.com/problems/palindrome-partitioning-ii/",
                        "platform": "leetcode",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "860419e34679402532af0eb2",
                        "title": "Partition Array for Maximum Sum",
                        "difficulty": "medium",
                        "link": "https://leetcode.com/problems/partition-array-for-maximum-sum/",
                        "platform": "leetcode",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "8482c5c2ad626c33281da392",
                        "title": "Partition Equal Subset Sum",
                        "difficulty": "medium",
                        "link": "https://leetcode.com/problems/partition-equal-subset-sum/",
                        "platform": "leetcode",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "333b84b8e0d308d913cfe142",
                        "title": "Rod Cutting Problem",
                        "difficulty": "medium",
                        "link": "https://www.geeksforgeeks.org/cutting-a-rod-dp-13/",
                        "platform": "gfg",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "74a3be23be31e8925f21ec57",
                        "title": "Shortest Common Supersequence",
                        "difficulty": "hard",
                        "link": "https://leetcode.com/problems/shortest-common-supersequence/",
                        "platform": "leetcode",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "6d2c0b252328f1df13282e76",
                        "title": "Subset Sum Equal to Target",
                        "difficulty": "medium",
                        "link": "https://www.geeksforgeeks.org/subset-sum-problem-dp-25/",
                        "platform": "gfg",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "96f83dffaa0d88c6e29d9e47",
                        "title": "Target Sum",
                        "difficulty": "medium",
                        "link": "https://leetcode.com/problems/target-sum/",
                        "platform": "leetcode",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "6843759a67c7b345d20cd4b2",
                        "title": "Triangle Min Path Sum",
                        "difficulty": "medium",
                        "link": "https://leetcode.com/problems/triangle/",
                        "platform": "leetcode",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "6de70cd1d34a52876bc384a9",
                        "title": "Unbounded Knapsack",
                        "difficulty": "medium",
                        "link": "https://www.geeksforgeeks.org/unbounded-knapsack-repetition-items-allowed/",
                        "platform": "gfg",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    },
                    {
                        "_id": "21265d82a3871716d129194a",
                        "title": "Wildcard Matching",
                        "difficulty": "hard",
                        "link": "https://leetcode.com/problems/wildcard-matching/",
                        "platform": "leetcode",
                        "isSolved": false,
                        "isCustom": false,
                        "notes": ""
                    }
                ]
            }
        ]
    }]
});

export default sheetContent;