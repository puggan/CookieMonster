/** Functions related to the Bottom Bar */

import {
  CacheObjects1,
  CacheObjects10,
  CacheObjects100,
} from '../../Cache/VariablesAndData';
import { CMOptions } from '../../Config/VariablesAndData';
import { VersionMajor, VersionMinor } from '../../Data/Moddata.ts';
import {
  Beautify,
  FormatTime,
  GetTimeColour,
} from '../BeautifyAndFormatting/BeautifyFormatting';
import GetCPS from '../HelperFunctions/GetCPS';
import GetWrinkConfigBank from '../HelperFunctions/GetWrinkConfigBank';
import {
  ColourBlue,
  ColourTextPre,
  ColourYellow,
  LastTargetBotBar,
} from '../VariablesAndData';
import { CreateBotBarBuildingColumn } from './CreateDOMElements';

/**
 * This function creates the bottom bar and appends it to l('wrapper')
 */
export function CreateBotBar() {
  const BotBar = document.createElement('div');
  BotBar.id = 'CMBotBar';
  BotBar.style.height = '69px';
  BotBar.style.width = '100%';
  BotBar.style.position = 'absolute';
  BotBar.style.display = 'none';
  BotBar.style.backgroundColor = '#262224';
  BotBar.style.backgroundImage = 'linear-gradient(to bottom, #4d4548, #000000)';
  BotBar.style.borderTop = '1px solid black';
  BotBar.style.overflow = 'auto';
  BotBar.style.textShadow =
    '-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black';

  const table = BotBar.appendChild(document.createElement('table'));
  table.style.width = '100%';
  table.style.textAlign = 'center';
  table.style.whiteSpace = 'nowrap';
  const tbody = table.appendChild(document.createElement('tbody'));

  const firstCol = function (text, color) {
    const td = document.createElement('td');
    td.style.textAlign = 'right';
    td.className = ColourTextPre + color;
    td.textContent = text;
    return td;
  };
  const type = tbody.appendChild(document.createElement('tr'));
  type.style.fontWeight = 'bold';
  type.appendChild(
    firstCol(`CM ${VersionMajor}.${VersionMinor}`, ColourYellow),
  );
  const bonus = tbody.appendChild(document.createElement('tr'));
  bonus.appendChild(firstCol('Bonus Income', ColourBlue));
  const pp = tbody.appendChild(document.createElement('tr'));
  pp.appendChild(firstCol('Payback Period', ColourBlue));
  const time = tbody.appendChild(document.createElement('tr'));
  time.appendChild(firstCol('Time Left', ColourBlue));

  l('wrapper').appendChild(BotBar);

  Object.keys(Game.Objects).forEach((i) => {
    CreateBotBarBuildingColumn(i);
  });
}

/**
 * This function updates the bonus-, pp-, and time-rows in the the bottom bar
 */
export function UpdateBotBar() {
  if (CMOptions.BotBar === 1 && CacheObjects1 && Game.buyMode === 1) {
    let count = 0;
    Object.keys(CacheObjects1).forEach((i) => {
      let target = Game.buyBulk;
      if (Game.buyMode === 1) {
        LastTargetBotBar = target;
      } else {
        target = LastTargetBotBar;
      }
      if (target === 1) target = CacheObjects1;
      if (target === 10) target = CacheObjects10;
      if (target === 100) target = CacheObjects100;
      count += 1;
      l('CMBotBar').firstChild.firstChild.childNodes[0].childNodes[
        count
      ].childNodes[1].textContent = Game.Objects[i].amount;
      l('CMBotBar').firstChild.firstChild.childNodes[1].childNodes[
        count
      ].textContent = Beautify(target[i].bonus, 2);
      l('CMBotBar').firstChild.firstChild.childNodes[2].childNodes[
        count
      ].className = ColourTextPre + target[i].color;
      let PPString;
      if (CMOptions.PPDisplayTime)
        PPString = FormatTime(Math.round(target[i].pp));
      else PPString = Beautify(Math.round(target[i].pp), 2);
      l('CMBotBar').firstChild.firstChild.childNodes[2].childNodes[
        count
      ].textContent = PPString;
      const timeColour = GetTimeColour(
        (Game.Objects[i].bulkPrice - (Game.cookies + GetWrinkConfigBank())) /
          GetCPS(),
      );
      l('CMBotBar').firstChild.firstChild.childNodes[3].childNodes[
        count
      ].className = ColourTextPre + timeColour.color;
      if (
        timeColour.text === 'Done!' &&
        Game.cookies < Game.Objects[i].bulkPrice
      ) {
        l('CMBotBar').firstChild.firstChild.childNodes[3].childNodes[
          count
        ].textContent = `${timeColour.text} (with Wrink)`;
      } else
        l('CMBotBar').firstChild.firstChild.childNodes[3].childNodes[
          count
        ].textContent = timeColour.text;
    });
  }
}
