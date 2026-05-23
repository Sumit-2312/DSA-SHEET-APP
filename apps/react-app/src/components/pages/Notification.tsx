import { useState } from "react";
import {
  Bell,
  BellOff,
  Check,
  CircleCheck,
  LayoutList,
  Clock,
  BarChart2,
  X,
} from "lucide-react";
import { useRecoilState } from "recoil";
import isOpenNotificationState from "../../recoilstates/notification/isOpen";

type Difficulty = "easy" | "medium" | "hard";

interface QuestionRef {
  id: string;
  title: string;
  difficulty: Difficulty;
}

interface Notification {
  id: string;
  type: "sheet" | "reminder" | "review";
  sender: string;
  message: string;
  time: string;
  questions: QuestionRef[];
  read: boolean;
}

const difficultyStyle: Record<Difficulty, string> = {
  easy:
    "text-teal-700 bg-teal-50 dark:text-teal-300 dark:bg-teal-900/20",
  medium:
    "text-amber-700 bg-amber-50 dark:text-amber-300 dark:bg-amber-900/20",
  hard:
    "text-red-700 bg-red-50 dark:text-red-300 dark:bg-red-900/20",
};

const typeConfig = {
  sheet: {
    icon: LayoutList,
    color:
      "text-blue-700 bg-blue-50 dark:text-blue-300 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800",
  },
  reminder: {
    icon: Clock,
    color:
      "text-amber-700 bg-amber-50 dark:text-amber-300 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800",
  },
  review: {
    icon: BarChart2,
    color:
      "text-teal-700 bg-teal-50 dark:text-teal-300 dark:bg-teal-900/20 border-teal-200 dark:border-teal-800",
  },
};

function NotificationItem({
  notif,
  onMarkRead,
}: {
  notif: Notification;
  onMarkRead: (id: string) => void;
}) {
  const { icon: Icon, color } = typeConfig[notif.type];

  return (
    <div
      className={`
      flex gap-3.5 px-5 py-4 border-b
      border-gray-100 dark:border-white/[0.06]
      last:border-none transition-colors
      ${notif.read
        ? "bg-transparent"
        : "bg-blue-50/30 dark:bg-blue-950/10"}
    `}
    >
      {/* unread dot */}
      <div className="flex flex-col items-center pt-1.5">
        <div
          className={`
            w-[7px]
            h-[7px]
            rounded-full
            flex-shrink-0
            transition-opacity
            ${notif.read ? "opacity-0" : "bg-blue-500"}
          `}
        />
      </div>

      {/* icon */}
      <div
        className={`
          w-[34px]
          h-[34px]
          rounded-lg
          border
          flex
          items-center
          justify-center
          flex-shrink-0
          transition-colors
          ${
            notif.read
              ? "text-gray-400 bg-gray-50 dark:bg-white/5 border-gray-100 dark:border-white/[0.06]"
              : color
          }
        `}
      >
        <Icon size={16} />
      </div>

      {/* body */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2 mb-1">
          <span
            className={`
              text-[13px]
              ${
                notif.read
                  ? "text-gray-400 dark:text-gray-500 font-normal"
                  : "text-gray-800 dark:text-gray-100 font-medium"
              }
            `}
          >
            {notif.sender}
          </span>

          <span className="text-[11px] text-gray-400 dark:text-gray-500 whitespace-nowrap">
            {notif.time}
          </span>
        </div>

        <p className="text-[13px] text-gray-500 dark:text-gray-400 leading-relaxed mb-3">
          {notif.message}
        </p>

        {/* questions */}
        <div className="flex flex-col gap-1.5 mb-3">
          {notif.questions.map((q, i) => (
            <div
              key={q.id}
              className="
                flex items-center gap-2
                px-3 py-2
                bg-gray-50
                dark:bg-white/[0.03]
                border border-gray-100
                dark:border-white/[0.06]
                rounded-lg
              "
            >
              <span className="text-[11px] text-gray-400 dark:text-gray-500 font-medium w-5">
                {String(i + 1).padStart(2, "0")}
              </span>

              <span className="text-[12px] text-gray-700 dark:text-gray-200 flex-1 truncate">
                {q.title}
              </span>

              <span
                className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${difficultyStyle[q.difficulty]}`}
              >
                {q.difficulty}
              </span>
            </div>
          ))}
        </div>

        {/* footer */}
        <div className="flex justify-end">
          {notif.read ? (
            <span className="flex items-center gap-1.5 text-[11px] text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-900/20 border border-teal-200 dark:border-teal-800 px-3 py-1 rounded-full">
              <CircleCheck size={12} />
              Read
            </span>
          ) : (
            <button
              onClick={() => onMarkRead(notif.id)}
              className="
                flex items-center gap-1.5
                text-[11px]
                text-gray-500
                dark:text-gray-400
                border border-gray-200
                dark:border-white/10
                px-3 py-1
                rounded-full
                hover:text-gray-700
                dark:hover:text-gray-200
                hover:border-gray-300
                dark:hover:border-white/20
                transition-colors
              "
            >
              <Check size={11} strokeWidth={2.5} />
              Mark as read
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export function NotificationPanel() {
  const [isOpen, setIsOpen] =
    useRecoilState(isOpenNotificationState);

  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "n1",
      type: "sheet",
      read: false,
      sender: "New sheet assigned — DSA Fundamentals",
      message:
        "Rahul assigned you a new practice sheet. Complete these questions before your next session.",
      time: "2 min ago",
      questions: [
        { id: "q1", title: "Two Sum", difficulty: "easy" },
        {
          id: "q2",
          title: "Best Time to Buy and Sell Stock",
          difficulty: "easy",
        },
        {
          id: "q3",
          title:
            "Longest Substring Without Repeating Characters",
          difficulty: "medium",
        },
      ],
    },
    {
      id: "n2",
      type: "reminder",
      read: false,
      sender: "Reminder — unsolved questions",
      message:
        "You have 2 pending questions from yesterday's session that are still unsolved.",
      time: "1 hr ago",
      questions: [
        {
          id: "q4",
          title: "Median of Two Sorted Arrays",
          difficulty: "hard",
        },
        {
          id: "q5",
          title: "Container With Most Water",
          difficulty: "medium",
        },
      ],
    },
    {
      id: "n3",
      type: "review",
      read: false,
      sender: "Weekly review ready",
      message:
        "Your week 4 review is ready. Here are questions selected based on your weak areas.",
      time: "5 hr ago",
      questions: [
        {
          id: "q6",
          title: "Word Ladder",
          difficulty: "hard",
        },
        {
          id: "q7",
          title: "Group Anagrams",
          difficulty: "medium",
        },
        {
          id: "q8",
          title: "Valid Parentheses",
          difficulty: "easy",
        },
      ],
    },
  ]);

  const unreadCount =
    notifications.filter((n) => !n.read).length;

  const markRead = (id: string) =>
    setNotifications((prev) =>
      prev.map((n) =>
        n.id === id
          ? { ...n, read: true }
          : n
      )
    );

  const markAll = () =>
    setNotifications((prev) =>
      prev.map((n) => ({
        ...n,
        read: true,
      }))
    );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">

      <div
        className="
          w-[70vw]
          h-[70vh]
          bg-white
          dark:bg-[#0f172a]
          rounded-2xl
          border border-gray-100
          dark:border-white/[0.06]
          shadow-2xl
          overflow-hidden
          flex flex-col
        "
      >
        {/* header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-white/[0.06]">

          <div className="flex items-center gap-2.5">
            <Bell
              size={17}
              className="text-gray-400 dark:text-gray-500"
            />

            <span className="text-[15px] font-medium text-gray-800 dark:text-gray-100">
              Notifications
            </span>

            {unreadCount > 0 ? (
              <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-blue-600 text-white">
                {unreadCount} unread
              </span>
            ) : (
              <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-teal-50 dark:bg-teal-900/20 text-teal-700 dark:text-teal-300">
                All read
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">

            {unreadCount > 0 && (
              <button
                onClick={markAll}
                className="
                  text-[12px]
                  text-gray-500
                  dark:text-gray-400
                  border
                  border-gray-200
                  dark:border-white/10
                  px-3 py-1
                  rounded-full
                "
              >
                Mark all as read
              </button>
            )}

            <button
              onClick={() => setIsOpen(false)}
              className="
                p-2 rounded-lg
                hover:bg-gray-100
                dark:hover:bg-white/10
              "
            >
              <X size={18} />
            </button>

          </div>
        </div>

        {/* body */}
        {notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center flex-1 gap-2">
            <BellOff
              size={28}
              className="text-gray-300 dark:text-gray-600"
            />
            <p className="text-[13px] text-gray-400 dark:text-gray-500">
              No notifications yet
            </p>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto">
            {notifications.map((n) => (
              <NotificationItem
                key={n.id}
                notif={n}
                onMarkRead={markRead}
              />
            ))}
          </div>
        )}
      </div>

    </div>
  );
}