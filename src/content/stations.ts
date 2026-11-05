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
    title: { en: 'Bedroom', ko: '대기실' },
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
    logDate: { en: 'January 14th', ko: '날짜 없음' },
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
        '임시 기록 01 — 첫 번째 기록을 여기에 적으세요. 글자가 한 자씩 나타납니다.',
        '{name}, 당신보다 먼저 누군가 이곳에 있었습니다.',
        '이야기에 필요한 만큼 문단을 추가하세요. 마지막 문단은 선택으로 이어져야 합니다.',
      ],
    },
    prompt: {
      en: `It’s late, and the dolls are pressed up against you again. {name}, why did you keep them here?`,
      ko: `밤이 깊었고, 인형들이 또다시 당신 곁에 바짝 붙어 있어요. {name}, 왜 그것들을 여기에 두었나요?`,
    },
    options: [
      { choice: 'mixed', text: { en: `I put the others back on the shelf but keep the broken one. I can’t tell if I’m holding it for comfort or because I’m afraid to let go.`, ko: `I put the others back on the shelf but keep the broken one. I can’t tell if I’m holding it for comfort or because I’m afraid to let go.` } }, // TODO(CONTENT): Korean
      { choice: 'accept', text: { en: `I clear the bed completely, even the broken one. If nothing is going to touch me, then it’s my choice this time, not his.`, ko: `I clear the bed completely, even the broken one. If nothing is going to touch me, then it’s my choice this time, not his.` } }, // TODO(CONTENT): Korean
      { choice: 'deny', text: { en: `I pull the blanket over my head and hold them tighter. I’m safer boxed in, and if I never ask why I need them, I never have to hear the answer.`, ko: `I pull the blanket over my head and hold them tighter. I’m safer boxed in, and if I never ask why I need them, I never have to hear the answer.` } }, // TODO(CONTENT): Korean
    ],
  },
  {
    id: 2,
    title: { en: 'Nightstand', ko: '등불 선반' },
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
    logDate: { en: 'February 5th', ko: '날짜 없음' },
    log: {
      en: ["I didn't know what to do. It's not like I've been taught about how to deal with this kind of situation...",
           "The school seminars only talked about safety, but never taught about how to deal with it. I didn't really have a choice in the matter anyways. I just had to know.",
           "I feel so sick every time I think about it. I think this is my fourth one now. I don't even remember where I got the first one from anymore, just that I couldn't buy it near home, couldn't risk someone recognizing me at the counter. I keep them wrapped in an old sock at the bottom of my drawer, I don't know why I still bother hiding them, it's not like anyone comes in here anymore. I just can't help but feel so nauseous just even imagining it, my hands always shake a little right before, and I hate that part the most, the waiting.",
          "I think I missed my period last month, but thank goodness it was just late... But I still kept testing anyways. I just had to keep reassuring myself that everything's fine.",
          "It must be fine.",
           "I can't tell my parents, I don't even know what I'd say, and I don't think I want to find out what they'd say back. So I went to Jana instead, I think I just wanted her to tell me I was overreacting, that it was all in my head. Jana told me to chill out. She even gave me these pills, I think they're birth control.",
          ],
      ko: ['임시 기록 02 — 두 번째 기록.', '임시 문구 — 더 많은 글.', '임시 문구 — 마지막 문단.'],
    },
    prompt: {
      en: `You’re holding the fourth test. Jana’s pills are sitting right next to it, and you keep hearing her tell you to chill out.`,
      ko: `당신은 네 번째 테스트기를 들고 있어요. 바로 옆에는 자나의 알약이 놓여 있고, 진정하라던 그녀의 말이 계속 귓가에 맴돌아요.`,
    },
    options: [
      { choice: 'deny', text: { en: `I take one without checking what it is. If Jana says it’s nothing, it’s nothing.`, ko: `I take one without checking what it is. If Jana says it’s nothing, it’s nothing.` } }, // TODO(CONTENT): Korean
      { choice: 'accept', text: { en: `I don’t touch the pills. I don’t even know what they are. I’ll go to a real clinic, even if someone recognizes me.`, ko: `I don’t touch the pills. I don’t even know what they are. I’ll go to a real clinic, even if someone recognizes me.` } }, // TODO(CONTENT): Korean
      { choice: 'mixed', text: { en: `I take one so she won’t think I’m making a scene, but I keep the tests in the drawer. Being told I’m fine doesn’t make me believe it.`, ko: `I take one so she won’t think I’m making a scene, but I keep the tests in the drawer. Being told I’m fine doesn’t make me believe it.` } }, // TODO(CONTENT): Korean
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
      { choice: 'deny', text: { en: `I tell her I love it and laugh like the old me. I’m already the “no fun” one, and I can’t lose her too.`, ko: `I tell her I love it and laugh like the old me. I’m already the “no fun” one, and I can’t lose her too.` } }, // TODO(CONTENT): Korean
      { choice: 'accept', text: { en: `I stop hinting. I tell her plainly: what happened to me wasn’t “doing it.” It was something done to me.`, ko: `I stop hinting. I tell her plainly: what happened to me wasn’t “doing it.” It was something done to me.` } }, // TODO(CONTENT): Korean
      { choice: 'mixed', text: { en: `I thank her, but say it makes me uncomfortable and leave out why. I keep it up because I have nowhere else to put it, and I hope she asks.`, ko: `I thank her, but say it makes me uncomfortable and leave out why. I keep it up because I have nowhere else to put it, and I hope she asks.` } }, // TODO(CONTENT): Korean
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
    logDate: { en: 'April 29th', ko: '4월 20**' },
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
      { choice: 'deny', text: { en: `I leave the trophy where everyone can see it and smile when they congratulate me. I laughed along with the jokes so they wouldn’t be about me, and I can keep doing that. It stays small.`, ko: `I leave the trophy where everyone can see it and smile when they congratulate me. I laughed along with the jokes so they wouldn’t be about me, and I can keep doing that. It stays small.` } }, // TODO(CONTENT): Korean
      { choice: 'accept', text: { en: `I write all of it, including the night, with dates and what he and the instructor said. Then I hide it behind the trophy, because everyone looks at the trophy but never asked the story behind it.`, ko: `I write all of it, including the night, with dates and what he and the instructor said. Then I hide it behind the trophy, because everyone looks at the trophy but never asked the story behind it.` } }, // TODO(CONTENT): Korean
      { choice: 'mixed', text: { en: `I write only what I can stand to: the comments, the instructor brushing me off, the shared rooms. The night itself I leave blank, for now.`, ko: `I write only what I can stand to: the comments, the instructor brushing me off, the shared rooms. The night itself I leave blank, for now.` } }, // TODO(CONTENT): Korean
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
        `나는 말하려고 했다. 정말로. 처음엔 담임 선생님이었다. 겉으로는 정말 친절하고 이해심 많은 분이라서, 도와주실 거라고 생각하고 일어난 일을 털어놓았다. 하지만 선생님은 그저 오해가 아니었느냐고 물었고, 코치님과 이야기해 보라고 했다. 그런데 나는 이미 그랬다... 코치님은 내가 유난을 떤다고, 팀워크를 모르는 애라고 했고, 문제를 일으키면 다음 대회에 넣어 주지 않겠다고 협박했다. 그래도 멈추지 않았다. 복도에서도 그는 나를 쳐다봤고, 지나가며 "친근하게" 어깨를 툭툭 쳤다. 마치 나를 놀리듯이.`,
        `교장 선생님께도 갔다. 처음에는 친절했고, 내가 겪는 어떤 문제든 도와주고 싶어 하는 것처럼 굴었다... 그런데 내가 이야기하자 거의 흥미를 잃은 얼굴이 되더니, 학생을 함부로 심각한 일로 고발해서는 안 된다고 했다. 사실이고 "증거"도 있다고 하자, 직접 상황을 알아보겠다며 나를 돌려보냈다.`,
        `그 메일이 오기까지 한 달이 넘게 걸렸고, 심장이 가슴에서 튀어나올 것처럼 뛰었다... 하지만 메시지를 읽고 나서는 차라리 읽지 않았으면 싶었다. 학교가 그냥... 그를 정학시켰다고? 그리고 달리기 동아리에서 내보냈다. 그게 전부였다. 메일은 이 일을 "사건"이라 부르며 "관련 학생들을 보호하기 위해 교내에서 해결되었다"고 했다. 그가 무엇을 했는지는 적혀 있지 않았다. 폭행이라는 말조차 쓰지 않았다.`,
        `이제 동아리에 돌아가도 환영받는 느낌이 들지 않는다. 코치님은 나를 차갑게 대하고, 전에는 인사라도 하던 팀원들도 이제는 겨우 참아 주는 것 같다. 특히 남자애들은... 나를 못마땅한 눈으로 노려본다. 학교 사람들도 나를 보며, 들리는 거리에서도 수군거린다. 오해였을 수도 있다고, 내가 관심에 목마른 거짓말쟁이라고 말한다. 왜 벌을 받는 쪽이 나인지 모르겠다.`,
      ],
    },
    prompt: {
      en: `The email is still open. It says “resolved internally,” but it doesn’t say what he did. It doesn’t even say the word assault.`,
      ko: `이메일은 아직 열려 있어요. “교내에서 해결되었다”고 적혀 있지만, 그가 무엇을 했는지는 없어요. 폭행이라는 말조차 없어요.`,
    },
    options: [
      { choice: 'deny', text: { en: `I reply, “Thank you for looking into it.” He’s suspended and out of the club, so maybe that’s all someone like me gets. I go to practice, keep my head down, and let them whisper.`, ko: `I reply, “Thank you for looking into it.” He’s suspended and out of the club, so maybe that’s all someone like me gets. I go to practice, keep my head down, and let them whisper.` } }, // TODO(CONTENT): Korean
      { choice: 'mixed', text: { en: `I show my parents the email and tell them everything I haven’t. I’m scared of what they’ll say, but I’m more tired of carrying it alone.`, ko: `I show my parents the email and tell them everything I haven’t. I’m scared of what they’ll say, but I’m more tired of carrying it alone.` } }, // TODO(CONTENT): Korean
      { choice: 'accept', text: { en: `I write back: “Resolved how? What did he do?” I remind them I have proof, and I keep a copy of everything. If they won’t name it, I will.`, ko: `I write back: “Resolved how? What did he do?” I remind them I have proof, and I keep a copy of everything. If they won’t name it, I will.` } }, // TODO(CONTENT): Korean
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
        '임시 기록 06 — 거울 기록의 한국어 번역이 필요합니다. // TODO(CONTENT): Korean',
      ],
    },
    prompt: {
      en: `Your friends’ faces are blurred out, and so is yours. They’re still around somewhere, but nobody has said anything.`,
      ko: `친구들의 얼굴이 흐릿하게 지워져 있고, 당신의 얼굴도 그래요. 그들은 어딘가에 아직 있지만, 아무도 아무 말도 하지 않아요.`,
    },
    options: [
      { choice: 'mixed', text: { en: `I let one new person in, slowly. I’m terrified it will end the same way, but I can’t stay alone forever.`, ko: `I let one new person in, slowly. I’m terrified it will end the same way, but I can’t stay alone forever.` } }, // TODO(CONTENT): Korean
      { choice: 'accept', text: { en: `I stop believing people just because it’s easier. I ask the group why they looked away, because I want them to say it to my face.`, ko: `I stop believing people just because it’s easier. I ask the group why they looked away, because I want them to say it to my face.` } }, // TODO(CONTENT): Korean
      { choice: 'deny', text: { en: `I go back to them and act like nothing happened. A group that doesn’t believe me is still better than eating alone.`, ko: `I go back to them and act like nothing happened. A group that doesn’t believe me is still better than eating alone.` } }, // TODO(CONTENT): Korean
    ],
  },
]

// TODO(CONTENT): seventh (final) folder
export const FINAL_STATION = {
  title: { en: 'The Last Page', ko: '마지막 페이지' } as L,
  subtitle: { en: 'sealed until the other six are read', ko: '나머지 여섯을 읽을 때까지 봉인' } as L,
}
