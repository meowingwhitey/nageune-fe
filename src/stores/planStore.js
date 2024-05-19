import { ref } from "vue";
import { defineStore } from "pinia";
import axios from "axios";

export const usePlanStore = defineStore("planStore", () => {
  //문화재만 가져옴
  const planList = ref([
    {
      id: 1,
      title: "여행 이름1",
      visitDate: "2024-04-01",
      //chips는 백에서 distinct 사용해서 시대 중복 없이 가져옴
      chips: ["신라", "통일신라"],
      route: [
        {
          name: "첨성대",
          id: "1",
          lat: 35.8347,
          long: 129.2191,
          date: "2024-04-01",
        },
        {
          name: "불국사",
          id: "2",
          lat: 35.7902,
          long: 129.3321,
          date: "2024-04-01",
        },

        {
          name: "첨성대",
          id: "1",
          lat: 35.8347,
          long: 129.2191,
          date: "2024-04-02",
        },
        {
          name: "불국사",
          id: "2",
          lat: 35.7902,
          long: 129.3321,
          date: "2024-04-02",
        },
        {
          name: "첨성대",
          id: "1",
          lat: 35.8347,
          long: 129.2191,
          date: "2024-04-03",
        },
        {
          name: "불국사",
          id: "2",
          lat: 35.7902,
          long: 129.3321,
          date: "2024-04-03",
        },
      ],
    },
    {
      id: 2,
      title: "여행 이름2",
      visitDate: "2024-04-01",
      chips: ["신라", "통일신라"],
      route: [
        {
          name: "첨성대",
          id: "1",
          lat: 35.8347,
          long: 129.2191,
          date: "2024-04-01",
        },
        {
          name: "불국사",
          id: "2",
          lat: 35.7902,
          long: 129.3321,
          date: "2024-04-01",
        },

        {
          name: "첨성대",
          id: "1",
          lat: 35.8347,
          long: 129.2191,
          date: "2024-04-02",
        },
        {
          name: "불국사",
          id: "2",
          lat: 35.7902,
          long: 129.3321,
          date: "2024-04-02",
        },
        {
          name: "첨성대",
          id: "1",
          lat: 35.8347,
          long: 129.2191,
          date: "2024-04-03",
        },
        {
          name: "불국사",
          id: "2",
          lat: 35.7902,
          long: 129.3321,
          date: "2024-04-03",
        },
      ],
    },
    {
      id: 3,
      title: "여행 이름3",
      visitDate: "2024-04-01",
      chips: ["신라", "통일신라"],
      route: [
        {
          name: "첨성대",
          id: "1",
          lat: 35.8347,
          long: 129.2191,
          date: "2024-04-01",
        },
        {
          name: "불국사",
          id: "2",
          lat: 35.7902,
          long: 129.3321,
          date: "2024-04-01",
        },

        {
          name: "첨성대",
          id: "1",
          lat: 35.8347,
          long: 129.2191,
          date: "2024-04-02",
        },
        {
          name: "불국사",
          id: "2",
          lat: 35.7902,
          long: 129.3321,
          date: "2024-04-02",
        },
        {
          name: "첨성대",
          id: "1",
          lat: 35.8347,
          long: 129.2191,
          date: "2024-04-03",
        },
        {
          name: "불국사",
          id: "2",
          lat: 35.7902,
          long: 129.3321,
          date: "2024-04-03",
        },
      ],
    },
  ]);

  const plan = ref({
    id: 1,
    title: "여행 이름1",
    route: [
      {
        date: "2024-04-01",
        spots: [
          {
            name: "첨성대",
            id: "1",
            lat: 35.8347,
            long: 129.2191,
            // 이미지 링크 + 시대도 보내기
          },
          {
            name: "불국사",
            id: "2",
            lat: 35.7902,
            long: 129.3321,
          },
        ],
      },
      {
        date: "2024-04-02",
        spots: [
          {
            name: "첨성대",
            id: "1",
            lat: 35.8347,
            long: 129.2191,
          },
          {
            name: "불국사",
            id: "2",
            lat: 35.7902,
            long: 129.3321,
          },
        ],
      },
      {
        date: "2024-04-03",
        spots: [
          {
            name: "첨성대",
            id: "1",
            lat: 35.8347,
            long: 129.2191,
          },
          {
            name: "불국사",
            id: "2",
            lat: 35.7902,
            long: 129.3321,
          },
        ],
      },
    ],
  });

  return { planList, plan };
});
