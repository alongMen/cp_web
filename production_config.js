const fs = require('fs');

const env = process.argv.slice(2)[0];

let base_url;
let ws_common;
let ws_custom;
let ws_game;
if (env === 'test') {
  base_url = 'http://api.cp.cslgd.space';
  ws_common = 'ws://ws.common.cp.cslgd.space';
  ws_custom = 'ws://ws.custom.cp.cslgd.space';
  ws_game = 'ws://ws.game.cp.cslgd.space';
} else {
  base_url = '';
  ws_common = '';
  ws_custom = '';
  ws_game = '';
}

const str = `NODE_ENV=production
VUE_APP_REQUEST_URL=${base_url}
VUE_APP_WS_COMMON_URL=${ws_common}
VUE_APP_WS_CUSTOM_URL=${ws_custom}
VUE_APP_WS_GAME_URL=${ws_game}
`;

fs.writeFileSync('.env.production', str, 'utf8');
