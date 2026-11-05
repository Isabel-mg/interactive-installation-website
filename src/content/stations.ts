// ============================================================================
// STATIONS CONTENT  —  THE MAIN FILE YOU EDIT WHEN THE STORY IS READY
// Every text has an English (en) and Korean (ko) version.
//   passkey -> word hidden on a physical object. EITHER language's word works.
//   hint    -> shown only if the visitor taps "can't find the word?"
//   log     -> journal entry, one string per paragraph. {name} = visitor name.
//   prompt  -> one short line shown on the response form at the end of the log
// ============================================================================

import type { L, LS } from '../i18n'
import painting from '../assets/painting.jpg'

export type Choice = 'deny' | 'mixed' | 'accept'

export interface Station {
  id: number
  title: L
  subtitle: L
  passkey: L
  // shown under the "closed" line: a vague nudge
  desc: L
  // shown only after tapping "feeling lost?": more specific
  hint: L
  logDate: L
  log: LS
  prompt: L
  // optional picture shown at the top of the log, styled as a faded print
  // the three answers, in display order. Points come from the choice (deny 0, mixed 1, accept 2)
  options?: { choice: Choice; text: L }[]
  image?: { src: string; alt: L; caption: L }
}

export const STATIONS: Station[] = [
  {
    id: 1,
    // TODO(CONTENT): title, subtitle, passkey, hint, log, prompt — for station 1
    title: { en: 'Bedroom', ko: '침실' },
    subtitle: { en: 'entry 01', ko: '기록 01' },
    passkey: { en: 'BOXED', ko: 'BOXED' },
    desc: {
      en: `There should be something on the bed... something that has been held too many times.`,
      ko: `침대 위에 무언가 있을 거야... 너무 많이 안겨 닳아버린 무언가가.`,
    },
    hint: {
      en: `Look for the doll that’s been held the most, and check it for a tag or label.`,
      ko: `가장 많이 안긴 인형을 찾아서, 태그나 라벨이 있는지 확인해 보세요.`,
    },
    logDate: { en: 'January 14th', ko: '1월 14일' },
    log: {
      en: [
        "It hasn't always been like this...",
        'There were times when I could sleep with all my lights off, lying comfortably in a space with nothing but the sheets, but now I prefer to be boxed in.',
        'Maybe I need a wall to protect me from all those bedtime-story ghosts lingering around my bedroom, to hide those shadowy faces from my sight.',
        'It sounds crazy.',
        "Maybe I'm going crazy...",
        "Maybe I'm overreacting, maybe it wasn't even that bad, maybe I'm just making it out to be more than it was. I tell myself that sometimes, and I almost believe it.",
        "I just want to feel normal again, whatever that was.",
        "But I just can't seem to get over how it felt like... caged by cold, rough hands holding me still.",
        "Maybe having all these dolls around me reminded me of how that felt like. They used to just sit on my shelf, I don't even remember buying half of them, birthday gifts, class prizes, things from when I was someone normal, someone who still slept fine. Now they're all on my bed, pressed up against me like I need them there. Maybe I had to remember how it felt like. Or maybe because I can't let go. I have no idea why I keep so many of them around me now.",
        "Couldn't it be just better to have nothing touch me at all?",
        "These days, I can hardly sleep without these thoughts, not to mention those nightmares, the ones where the shadowy faces from the ghost stories aren't just stories anymore... Where they have his familiar hands.",
      ],
      ko: [
        `처음부터 이랬던 건 아니다...`,
        `불을 다 끄고도 잠들 수 있던 때가 있었다. 이불 한 장만 덮고도 편하게 누워 있을 수 있던 때가. 그런데 지금은 무언가에 꽉 둘러싸여 있는 게 더 편하다.`,
        `어쩌면 벽이 필요한 건지도 모른다. 어릴 적 무서운 이야기 속 귀신들이 내 방을 맴돌지 못하게, 그 어두운 얼굴들이 눈에 보이지 않게 막아 줄 벽이.`,
        `미친 소리 같다.`,
        `어쩌면 정말 미쳐 가는 건지도 모르겠다...`,
        `내가 너무 예민한 건지도 모른다. 사실 그렇게 심한 일도 아니었는데, 별것 아닌 일을 내가 크게 부풀리는 건지도. 가끔 스스로에게 그렇게 말하다 보면, 정말 그런 것 같기도 하다.`,
        `그냥 다시 평범해지고 싶다. 그게 어떤 거였든.`,
        `그런데 그 느낌이 도무지 잊히지 않는다... 차갑고 거친 손에 붙잡혀 꼼짝도 못 하던, 갇혀 있던 그 느낌이.`,
        `어쩌면 이 인형들이 그 느낌을 떠올리게 하는 건지도 모른다. 원래는 선반 위에 앉아 있기만 하던 것들이다. 절반은 언제 생겼는지도 기억나지 않는다. 생일 선물, 학교에서 받은 상품, 내가 아직 평범했던 시절, 아직 잠을 잘 자던 시절의 물건들. 그런데 지금은 전부 침대 위에서 나한테 바짝 붙어 있다. 꼭 내가 이것들을 필요로 하는 것처럼. 그 느낌을 기억해야 해서일까. 아니면 놓지 못해서일까. 왜 이렇게 많은 인형을 곁에 두는지 나도 모르겠다.`,
        `차라리 아무것도 나를 건드리지 않는 게 낫지 않을까?`,
        `요즘은 이런 생각 없이 잠드는 날이 거의 없다. 악몽은 말할 것도 없다. 무서운 이야기 속 어두운 얼굴들이 더 이상 이야기로 끝나지 않는 꿈... 그 얼굴들이 그의 익숙한 손을 하고 있는 꿈.`,
      ],
    },
    prompt: {
      en: `It’s late, and the dolls are pressed up against you again. {name}, why did you keep them here?`,
      ko: `밤이 깊었고, 인형들이 또다시 당신 곁에 바짝 붙어 있어요. {name}, 왜 그것들을 여기에 두었나요?`,
    },
    options: [
      { choice: 'mixed', text: { en: `I put the others back on the shelf but keep the broken one. I can’t tell if I’m holding it for comfort or because I’m afraid to let go.`, ko: `다른 인형들은 선반에 다시 올려놓지만, 망가진 하나는 곁에 둔다. 위로가 돼서 붙잡고 있는 건지, 놓기가 무서워서인지 나도 모르겠다.` } },
      { choice: 'accept', text: { en: `I clear the bed completely, even the broken one. If nothing is going to touch me, then it’s my choice this time, not his.`, ko: `망가진 것까지 전부 침대에서 치운다. 아무것도 나를 건드리지 않게 할 거라면, 이번만큼은 그가 아니라 내가 정한다.` } },
      { choice: 'deny', text: { en: `I pull the blanket over my head and hold them tighter. I’m safer boxed in, and if I never ask why I need them, I never have to hear the answer.`, ko: `이불을 머리끝까지 뒤집어쓰고 인형들을 더 꽉 끌어안는다. 이렇게 갇혀 있는 게 더 안전하다. 왜 이것들이 필요한지 묻지 않으면, 그 답을 들을 일도 없으니까.` } },
    ],
  },
  {
    id: 2,
    title: { en: 'Nightstand', ko: '협탁' },
    subtitle: { en: 'entry 02 / placeholder', ko: '기록 02 / 임시' },
    passkey: { en: 'CHILL OUT', ko: 'CHILL OUT' },
    desc: {
      en: `There should be something here... something someone left for me to find.`,
      ko: `여기에 무언가 있을 거야... 누군가 내가 찾도록 남겨둔 무언가가.`,
    },
    hint: {
      en: `Someone left a note on the empty box, so read what they told her.`,
      ko: `누군가 빈 상자에 쪽지를 남겼어요. 그들이 그녀에게 뭐라고 했는지 읽어 보세요.`,
    },
    logDate: { en: 'February 5th', ko: '2월 5일' },
    log: {
      en: ["I didn't know what to do. It's not like I've been taught about how to deal with this kind of situation...",
           "The school seminars only talked about safety, but never taught about how to deal with it. I didn't really have a choice in the matter anyways. I just had to know.",
           "I feel so sick every time I think about it. I think this is my fourth one now. I don't even remember where I got the first one from anymore, just that I couldn't buy it near home, couldn't risk someone recognizing me at the counter. I keep them wrapped in an old sock at the bottom of my drawer, I don't know why I still bother hiding them, it's not like anyone comes in here anymore. I just can't help but feel so nauseous just even imagining it, my hands always shake a little right before, and I hate that part the most, the waiting.",
          "I think I missed my period last month, but thank goodness it was just late... But I still kept testing anyways. I just had to keep reassuring myself that everything's fine.",
          "It must be fine.",
           "I can't tell my parents, I don't even know what I'd say, and I don't think I want to find out what they'd say back. So I went to Jana instead, I think I just wanted her to tell me I was overreacting, that it was all in my head. Jana told me to chill out. She even gave me these pills, I think they're birth control.",
          ],
      ko: [
        `어떻게 해야 할지 몰랐다. 이런 일이 생기면 어떻게 해야 하는지, 누가 가르쳐 준 것도 아니니까...`,
        `학교 성교육 시간에는 조심하라는 말만 했지, 이런 일이 생긴 뒤에 어떻게 해야 하는지는 알려 주지 않았다. 사실 나한테 고를 수 있는 길이 있었던 것도 아니다. 그냥 확인해야만 했다.`,
        `그 생각만 하면 속이 메스껍다. 이번이 벌써 네 번째인 것 같다. 첫 번째는 어디서 샀는지도 이제 기억나지 않는다. 기억나는 건 집 근처에서는 살 수 없었다는 것뿐이다. 계산대에서 아는 사람이라도 마주칠까 봐. 나는 그것들을 낡은 양말에 싸서 서랍 맨 아래에 넣어 둔다. 이제 이 방에 들어오는 사람도 없는데, 왜 아직도 숨기는지 모르겠다. 상상만 해도 속이 울렁거린다. 결과를 보기 직전이면 늘 손이 조금 떨린다. 그 기다리는 시간이 제일 싫다.`,
        `지난달에 생리를 건너뛴 줄 알았는데, 다행히 그냥 늦어진 거였다... 그래도 계속 검사했다. 다 괜찮다고, 계속 나 자신을 안심시켜야만 했다.`,
        `괜찮을 거다. 그래야만 한다.`,
        `부모님께는 말할 수 없다. 뭐라고 말해야 할지도 모르겠고, 부모님이 뭐라고 하실지는 더더욱 알고 싶지 않다. 그래서 대신 자나를 찾아갔다. 아마 내가 너무 예민하게 군다고, 다 내 착각이라고 말해 주길 바랐던 것 같다. 자나는 나한테 진정 좀 하라고 했다. 그리고 이 알약까지 줬다. 피임약인 것 같다.`,
      ],
    },
    prompt: {
      en: `You’re holding the fourth test. Jana’s pills are sitting right next to it, and you keep hearing her tell you to chill out.`,
      ko: `당신은 네 번째 테스트기를 들고 있어요. 바로 옆에는 자나의 알약이 놓여 있고, 진정하라던 그녀의 말이 계속 귓가에 맴돌아요.`,
    },
    options: [
      { choice: 'deny', text: { en: `I take one without checking what it is. If Jana says it’s nothing, it’s nothing.`, ko: `뭔지 확인도 하지 않고 하나를 삼킨다. 자나가 별거 아니라고 했으니까, 별거 아닌 거다.` } },
      { choice: 'accept', text: { en: `I don’t touch the pills. I don’t even know what they are. I’ll go to a real clinic, even if someone recognizes me.`, ko: `알약에는 손대지 않는다. 뭔지도 모르는 약이다. 누가 나를 알아보더라도, 제대로 된 병원에 가겠다.` } },
      { choice: 'mixed', text: { en: `I take one so she won’t think I’m making a scene, but I keep the tests in the drawer. Being told I’m fine doesn’t make me believe it.`, ko: `유난 떤다는 소리를 듣기 싫어서 하나를 먹지만, 테스트기는 서랍에 그대로 둔다. 괜찮다는 말을 듣는다고 정말 괜찮아지는 건 아니니까.` } },
    ],
  },
  {
    id: 3,
    title: { en: 'The Painting', ko: '그림' },
    subtitle: { en: 'entry 03 / placeholder', ko: '기록 03 / 임시' },
    passkey: { en: 'FUN', ko: 'FUN' },
    desc: {
      en: `There should be something near the painting... something that came with a smile.`,
      ko: `그림 근처에 무언가 있을 거야... 웃음과 함께 온 무언가가.`,
    },
    hint: {
      en: `Someone wished her a happy birthday, so find the card and read it closely.`,
      ko: `누군가 그녀에게 생일 축하를 전했어요. 카드를 찾아서 자세히 읽어 보세요.`,
    },
    logDate: { en: 'March 20th', ko: '3월 20일' },
    image: {
      src: painting,
      alt: { en: 'A bright, loosely painted scene of figures resting among trees', ko: '나무 사이에서 쉬고 있는 인물들을 거칠게 그린 밝은 그림' },
      caption: { en: 'The Joy of Life by Henri Matisse', ko: '앙리 마티스, 「삶의 기쁨」' },
    },
    log: {
      en: [
        `Jana said that I've been too stiff, and that these days I'm no fun. I didn't exactly tell her what happened, or at least I tried to in my own way, but she just said there's nothing serious with... you know... "doing it." So for my birthday, she gifted me this painting. I didn't really have anywhere else to hang it, so I guess it's here.`,
        `But looking at it, looking at "The Joy of Life," I don't know if I feel the type of joy that they're referring to. Maybe I used to. I don't really remember what that felt like anymore, joy, or if I even had the right idea of what it was supposed to feel like in the first place. In fact, I feel uncomfortable looking at it, but I don't know what to tell Jana. I don't know how to tell her that I don't think I'm allowed to feel that anymore, whatever that is, that thing they're all feeling in the painting. Maybe I never was.`,
        `These days, everything seems to remind me of him. I can barely leave the house, let alone this room. It's like I'm trapped in here, replaying it, again and again, until I can't tell if I'm remembering it or just making it worse each time. Or maybe I'm trapped in that painting, one of those figures blended in with nature, except my room is the desert, and nothing grows here, and nothing's supposed to.`,
      ],
      ko: [
        `자나는 내가 너무 딱딱하다고, 요즘은 재미가 없다고 했다. 무슨 일이 있었는지 정확히 말하지는 않았다. 아니, 나름대로 말해보려고 했는데, 자나는 그게 뭐 심각할 게 있냐고만 했다. 그러니까... 그걸 "하는" 게. 그래서 생일 선물로 이 그림을 줬다. 달리 걸 곳이 없어서, 그냥 여기에 걸어 두었다.`,
        `그런데 이 그림, 「삶의 기쁨」을 보고 있으면 그들이 말하는 그런 기쁨을 내가 느끼는지 모르겠다. 예전에는 느꼈을지도 모른다. 기쁨이 어떤 느낌이었는지 이제는 기억나지 않는다. 애초에 그게 어떤 느낌이어야 하는지 제대로 알고 있기나 했는지도. 사실 이 그림을 보면 불편하다. 하지만 자나에게 뭐라고 말해야 할지 모르겠다. 그림 속 모두가 느끼는 그것, 그게 무엇이든, 이제 나는 그걸 느낄 자격이 없는 것 같다는 말을 어떻게 해야 할까. 어쩌면 처음부터 없었는지도 모른다.`,
        `요즘은 모든 것이 그를 떠올리게 한다. 집 밖으로 거의 나가지 못하고, 이 방조차 벗어나지 못한다. 이곳에 갇혀 그 일을 되풀이하다 보면, 기억하는 건지 매번 더 나쁘게 만들고 있는 건지 알 수가 없다. 어쩌면 나는 저 그림 속에 갇힌 건지도 모른다. 자연에 섞여 든 인물들 중 하나로. 다만 내 방은 사막이라서, 아무것도 자라지 않고, 자랄 필요도 없다.`,
      ],
    },
    prompt: {
      en: `Jana is waiting for you to say something about her gift. The people in the painting look happy, and you can’t remember what that feels like…`,
      ko: `자나는 당신이 선물에 대해 뭐라고 말하기를 기다리고 있어요. 그림 속 사람들은 행복해 보이는데, 당신은 그게 어떤 기분이었는지 기억나지 않아요…`,
    },
    options: [
      { choice: 'deny', text: { en: `I tell her I love it and laugh like the old me. I’m already the “no fun” one, and I can’t lose her too.`, ko: `정말 마음에 든다고 말하고, 예전의 나처럼 웃는다. 나는 이미 "재미없는 애"가 됐다. 자나까지 잃을 수는 없다.` } },
      { choice: 'accept', text: { en: `I stop hinting. I tell her plainly: what happened to me wasn’t “doing it.” It was something done to me.`, ko: `더는 돌려 말하지 않는다. 자나에게 분명히 말한다. 나한테 일어난 일은 그걸 "한" 게 아니었다고. 누군가 나한테 저지른 일이었다고.` } },
      { choice: 'mixed', text: { en: `I thank her, but say it makes me uncomfortable and leave out why. I keep it up because I have nowhere else to put it, and I hope she asks.`, ko: `고맙다고는 하지만, 이 그림을 보면 불편하다고 말한다. 이유는 말하지 않는다. 달리 걸 곳이 없어서 그림은 그대로 두고, 자나가 먼저 물어봐 주기를 바란다.` } },
    ],
  },
  {
    id: 4,
    title: { en: 'Bookshelf', ko: '책장' },
    subtitle: { en: 'entry 04 / placeholder', ko: '기록 04 / 임시' },
    passkey: { en: 'FIRST PLACE', ko: 'FIRST PLACE' },
    desc: {
      en: `There should be something on the shelf... something everyone looks at, but nobody reads.`,
      ko: `선반 위에 무언가 있을 거야... 모두가 쳐다보지만 아무도 읽지 않는 무언가가.`,
    },
    hint: {
      en: `Everyone looks at the trophy, but has anyone read what’s printed on its base?`,
      ko: `모두가 트로피를 보지만, 받침대에 적힌 글을 읽어 본 사람이 있을까요?`,
    },
    logDate: { en: 'April 29th', ko: '4월 29일' },
    log: {
      en: [
        `I remember when I first joined the cross-country running team. Everybody was so accepting. I was one of the very few girls who took it seriously, and I was selected as one of the top runners who would participate in the competition. I was proud. I think that might have been the last time I felt proud of anything.`,
        `I remember the guys whispering when they thought I couldn't hear them. At first, it was just stupid comments, but when I tried to ignore them and didn't react, they started getting bolder. At the center of everything, "he" was always the ringleader. He had always been direct with his comments, masking them as "jokes." The other boys would just laugh and join in. Sometimes I laughed too, just so it wouldn't feel like it was aimed at me.`,
        `It all culminated when we went to another city for the competition. That's when he started getting more aggressive with his advances. He said he was just complimenting my skills, but he started getting closer... I tried to tell the instructor what was happening, but he brushed it off, saying that he was just being friendly. I don't know why, but they didn't give us separate quarters. The excuse was probably money. So one night he just came and... I don't know if I wanna write this down.`,
        `We won that season and got this trophy, but I can't help but feel shame when I look at it. It sits on the shelf where everyone can see it, and everyone keeps telling me how proud I should be.`,
      ],
      ko: [
        `크로스컨트리 팀에 처음 들어갔을 때가 기억난다. 모두가 나를 받아 주었다. 나는 이걸 진지하게 대하는 몇 안 되는 여자애 중 하나였고, 대회에 나갈 상위 선수로 뽑혔다. 자랑스러웠다. 무언가가 자랑스러웠던 건 그때가 마지막이었던 것 같다.`,
        `남자애들이 내가 못 듣는 줄 알고 수군거리던 게 기억난다. 처음에는 그냥 시시한 말들이었는데, 내가 무시하고 반응하지 않자 점점 대담해졌다. 모든 일의 중심에는 언제나 "그"가 있었다. 그는 늘 노골적이었고, 그걸 "농담"인 척 포장했다. 다른 애들은 웃으며 따라 했다. 가끔은 나도 웃었다. 나를 겨냥한 말처럼 느껴지지 않게 하려고.`,
        `대회 때문에 다른 도시로 갔을 때 모든 게 터졌다. 그때부터 그의 접근은 더 노골적이 되었다. 그는 내 실력을 칭찬하는 거라고 했지만, 점점 더 가까이 다가왔다... 나는 지도 선생님에게 무슨 일이 벌어지고 있는지 말하려고 했다. 선생님은 그냥 친하게 지내려는 거라며 넘겨 버렸다. 왜인지 모르겠지만 우리에게 방을 따로 주지 않았다. 아마 돈 때문이라는 핑계였을 것이다. 그래서 어느 날 밤 그가 찾아와서... 이걸 적어도 될지 모르겠다.`,
        `그 시즌에 우리는 우승했고 이 트로피를 받았다. 하지만 이걸 볼 때마다 수치심이 드는 걸 어쩔 수 없다. 모두가 볼 수 있는 선반 위에 놓여 있고, 모두가 내가 얼마나 자랑스러워해야 하는지 말해 준다.`,
      ],
    },
    prompt: {
      en: `The trophy is on the shelf where everyone can see it. Everybody keeps saying you should be proud, {name}, but you never finished writing down what happened.`,
      ko: `트로피는 모두가 볼 수 있는 선반 위에 있어요. 다들 자랑스러워해야 한다고 말하지만, {name}, 당신은 일어난 일을 끝내 다 적지 못했어요.`,
    },
    options: [
      { choice: 'deny', text: { en: `I leave the trophy where everyone can see it and smile when they congratulate me. I laughed along with the jokes so they wouldn’t be about me, and I can keep doing that. It stays small.`, ko: `트로피는 모두가 볼 수 있는 곳에 그대로 두고, 축하를 받으면 웃는다. 나를 향한 농담이 아닌 척하려고 같이 웃었던 것처럼, 앞으로도 그렇게 할 수 있다. 별일 아닌 걸로 남겨 두면 된다.` } },
      { choice: 'accept', text: { en: `I write all of it, including the night, with dates and what he and the instructor said. Then I hide it behind the trophy, because everyone looks at the trophy but never asked the story behind it.`, ko: `그날 밤까지 전부 적는다. 날짜도, 그와 지도 선생님이 했던 말도. 그리고 그 기록을 트로피 뒤에 숨겨 둔다. 모두가 트로피는 쳐다보지만, 그 뒤에 어떤 이야기가 있는지는 아무도 물어본 적이 없으니까.` } },
      { choice: 'mixed', text: { en: `I write only what I can stand to: the comments, the instructor brushing me off, the shared rooms. The night itself I leave blank, for now.`, ko: `견딜 수 있는 만큼만 적는다. 그 말들, 내 말을 흘려듣던 지도 선생님, 따로 주지 않았던 방. 그날 밤은 일단 비워 둔다.` } },
    ],
  },
  {
    id: 5,
    title: { en: 'Graduation Gown', ko: '졸업 가운' },
    subtitle: { en: 'entry 05 / placeholder', ko: '기록 05 / 임시' },
    passkey: { en: 'RESOLVED', ko: 'RESOLVED' },
    desc: {
      en: `There should be something on the gown... something official, pinned where I would see it.`,
      ko: `가운에 무언가 있을 거야... 내 눈에 띄도록 붙여 둔, 공식적인 무언가가.`,
    },
    hint: {
      en: `The school put it in writing, so look for the email on the gown and read the highlighted part.`,
      ko: `학교는 그것을 글로 남겼어요. 가운에 붙은 이메일을 찾아서 형광펜으로 칠한 부분을 읽어 보세요.`,
    },
    logDate: { en: 'August 18th', ko: '8월 18일' },
    log: {
      en: [
        "I tried to tell them, I really did.",
        "First, it was my homeroom teacher. I told her what happened because outwardly she was really kind and understanding, so I thought she would help me. Instead, she asked me if it was just a misunderstanding and said that I should talk to my coach. But the thing is, I already did...",
        `He said I was being dramatic and wasn't a team player, and he threatened to not include me in the next competition if I was going to stir up drama. But it wasn't stopping. Even in the hallways, he was looking at me, giving me "friendly" pats on the shoulder when passing by, like he was taunting me.`,
        `I went to the principal. At first he was kind and acted like he wanted to help me with whatever trouble I had... But when I told him, that's when he looked like he almost lost interest, saying that I can't go around accusing students of serious things. When I told him it was true, and that I had "proof", he said he would need to look into the situation himself and dismissed me.`,
        `It took over a month to receive that email, and my heart was pounding so hard it was threatening to jump out of my chest... But when I read the message, I almost wished I hadn't.`,
        `My school just... suspended him? And they forced him out of the running club. That was it. The email called it an "incident" and said the matter had been "resolved internally to protect the students involved." It didn't say what he did. It didn't even use the word assault.`,
        `Now when I go back to the club, I don't feel welcome anymore. My coach treats me coldly, and even my teammates who used to at least say hello now only seem to tolerate me. Especially the guys... They give me nasty stares. Even the people around the school look at me and whisper, even within earshot. They say that maybe it was a misunderstanding, or that I was an attention seeking liar.`,
        `I don't know why I'm the one being punished here.`,
      ],
      ko: [
        `나는 말하려고 했다. 정말로.`,
        `처음엔 담임 선생님이었다. 겉으로는 정말 친절하고 이해심 많은 분이라서, 도와주실 거라고 믿고 일어난 일을 털어놓았다. 하지만 선생님은 그냥 오해가 아니냐고 묻더니, 코치님과 이야기해 보라고 했다. 그런데 나는 이미 그랬다...`,
        `코치님은 내가 유난을 떤다고, 팀을 생각할 줄 모른다고 했다. 괜히 문제를 일으키면 다음 대회에 넣어 주지 않겠다고 겁도 줬다. 그래도 그는 멈추지 않았다. 복도에서도 나를 쳐다봤고, 지나가면서 "친근하게" 어깨를 툭툭 쳤다. 꼭 나를 비웃는 것처럼.`,
        `교장 선생님께도 찾아갔다. 처음에는 친절했다. 무슨 고민이든 도와주고 싶다는 듯이 굴었다... 그런데 내 이야기를 듣자 거의 관심을 잃은 얼굴이 되더니, 학생을 그런 심각한 일로 함부로 몰아가면 안 된다고 했다. 사실이라고, "증거"도 있다고 말하자, 직접 알아보겠다며 나를 돌려보냈다.`,
        `그 메일을 받기까지 한 달이 넘게 걸렸다. 열어 보기 전, 심장이 터질 것처럼 뛰었다... 하지만 메일을 읽고 나니, 차라리 읽지 말 걸 그랬다는 생각이 들었다.`,
        `학교는 그냥... 그를 정학시켰다고? 그리고 팀에서 내보냈다. 그게 끝이었다. 메일은 이 일을 "사안"이라고 부르며, "관련 학생들을 보호하기 위해 학교 내부에서 원만히 해결되었다"고 했다. 그가 무슨 짓을 했는지는 한 줄도 없었다. 성폭행이라는 말조차 쓰지 않았다.`,
        `이제 팀에 돌아가도 반겨 주는 사람이 없다. 코치님은 나를 차갑게 대하고, 전에는 인사라도 하던 팀원들도 이제는 나를 겨우 참아 주는 것 같다. 특히 남자애들은... 나를 기분 나쁘게 노려본다. 학교 사람들도 나를 보며 수군거린다. 내가 다 들리는 거리에서도. 오해였을지도 모른다고, 관심받고 싶어서 거짓말하는 애라고.`,
        `왜 벌을 받는 쪽이 나인지 모르겠다.`,
      ],
    },
    prompt: {
      en: `The email is still open. It says “resolved internally,” but it doesn’t say what he did. It doesn’t even say the word assault.`,
      ko: `메일은 아직 열려 있어요. “학교 내부에서 원만히 해결되었다”고 적혀 있지만, 그가 무슨 짓을 했는지는 없어요. 성폭행이라는 말조차 없어요.`,
    },
    options: [
      { choice: 'deny', text: { en: `I reply, “Thank you for looking into it.” He’s suspended and out of the club, so maybe that’s all someone like me gets. I go to practice, keep my head down, and let them whisper.`, ko: `"알아봐 주셔서 감사합니다."라고 답장한다. 그는 정학을 받았고 팀에서도 나갔으니, 나 같은 애가 받을 수 있는 건 이게 전부인지도 모른다. 연습에 나가 고개를 숙이고, 수군거리든 말든 그냥 둔다.` } },
      { choice: 'mixed', text: { en: `I show my parents the email and tell them everything I haven’t. I’m scared of what they’ll say, but I’m more tired of carrying it alone.`, ko: `부모님께 메일을 보여 드리고, 아직 하지 못한 이야기를 전부 털어놓는다. 부모님이 뭐라고 하실지 무섭지만, 이걸 혼자 안고 있는 게 더 지쳤다.` } },
      { choice: 'accept', text: { en: `I write back: “Resolved how? What did he do?” I remind them I have proof, and I keep a copy of everything. If they won’t name it, I will.`, ko: `답장을 쓴다. "무엇이 어떻게 해결되었다는 거죠? 그가 무슨 짓을 했는데요?" 나에게 증거가 있다는 걸 다시 알리고, 모든 자료의 사본을 남겨 둔다. 학교가 끝까지 그 일을 제대로 말하지 않는다면, 내가 말하겠다.` } },
    ],
  },
  {
    id: 6,
    title: { en: 'Mirror', ko: '거울' },
    subtitle: { en: 'entry 06', ko: '기록 06' },
    passkey: { en: 'BELONG', ko: 'BELONG' },
    desc: {
      en: `There should be something here... something that shows me who I used to be.`,
      ko: `여기에 무언가 있을 거야... 예전의 내가 누구였는지 보여 주는 무언가가.`,
    },
    hint: {
      en: `Look closely around the mirror for a small note in her handwriting, stuck among the photos.`,
      ko: `거울 주변을 자세히 살펴보세요. 사진들 사이에 붙은, 그녀의 글씨로 쓴 작은 쪽지가 있어요.`,
    },
    logDate: { en: 'September 1st', ko: '9월 1일' },
    log: {
      en: [
        `There were days when I felt happy that I had found a place where I belonged. I believed whatever they said without stopping to think about my own thoughts and morals. It was just easier that way, easier to feel like I belonged somewhere.`,
        `But when I finally needed their kind words and help, all I got were cold shoulders and judgment. It’s almost like they didn’t believe me, or maybe they never cared to believe me in the first place. Maybe it was just easier to keep the peace, to pretend I was “just being dramatic,” or that I was “lying for attention.”`,
        `I know not everyone would treat me this way, but I can’t help being scared to make a new friend. What if it ends up exactly the same? It sounds childish to be scared of something like that...`,
        `Maybe I should just forget it ever happened and go back. At least then I’d have somebody to talk to.`,
      ],
      ko: [
        `내가 있을 곳을 찾았다는 생각에 행복했던 날들이 있었다. 나는 그들이 하는 말이라면, 내 생각이나 옳고 그름은 따져 보지도 않고 다 믿었다. 그게 더 쉬웠으니까. 어딘가에 속해 있다고 느끼는 게 더 쉬웠으니까.`,
        `그런데 정작 따뜻한 말과 도움이 필요했을 때, 돌아온 건 차가운 외면과 손가락질뿐이었다. 꼭 나를 믿지 않는 것 같았다. 아니, 처음부터 믿어 줄 생각이 없었는지도 모른다. 어쩌면 그냥 조용히 넘어가는 게 더 편했던 거다. 내가 "괜히 유난 떠는 거"라고, "관심받고 싶어서 거짓말하는 거"라고 여기는 편이.`,
        `모두가 나를 이렇게 대하지는 않을 거라는 걸 안다. 그래도 새 친구를 사귀는 게 무섭다. 또 똑같이 끝나면 어떡하지? 그런 게 무섭다니, 유치하게 들린다는 것도 안다...`,
        `차라리 아무 일도 없었던 것처럼 잊고 그들에게 돌아갈까. 그러면 적어도 이야기할 사람은 생기니까.`,
      ],
    },
    prompt: {
      en: `Your friends’ faces are blurred out, and so is yours. They’re still around somewhere, but nobody has said anything.`,
      ko: `친구들의 얼굴이 흐릿하게 지워져 있고, 당신의 얼굴도 그래요. 그들은 어딘가에 아직 있지만, 아무도 아무 말도 하지 않아요.`,
    },
    options: [
      { choice: 'mixed', text: { en: `I let one new person in, slowly. I’m terrified it will end the same way, but I can’t stay alone forever.`, ko: `새로운 사람 한 명에게만, 천천히 마음을 열어 본다. 또 똑같이 끝날까 봐 무섭지만, 언제까지나 혼자 있을 수는 없다.` } },
      { choice: 'accept', text: { en: `I stop believing people just because it’s easier. I ask the group why they looked away, because I want them to say it to my face.`, ko: `편하다는 이유로 사람들 말을 믿는 건 이제 그만둔다. 그 무리에게 왜 모른 척했는지 묻는다. 내 앞에서 직접 말하게 하고 싶으니까.` } },
      { choice: 'deny', text: { en: `I go back to them and act like nothing happened. A group that doesn’t believe me is still better than eating alone.`, ko: `다시 그들에게 돌아가 아무 일도 없었던 척한다. 나를 믿어 주지 않는 무리라도, 혼자 밥 먹는 것보다는 낫다.` } },
    ],
  },
]

// TODO(CONTENT): seventh (final) folder
export const FINAL_STATION = {
  title: { en: 'The Last Page', ko: '마지막 페이지' } as L,
  subtitle: { en: 'sealed until the other six are read', ko: '나머지 여섯을 읽을 때까지 봉인' } as L,
}
