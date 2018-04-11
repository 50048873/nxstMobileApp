<template>
  <div class="NMap">
    <div class="mapWrap">
      <div class="mapTransform" ref="mapTransform" :style="getScale" @touchstart="start" @touchmove.prevent="move" @touchend="end">
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="-46 -303 706 1006">
          <g id="realMap">
              <image style="overflow:visible;" width="1363" height="2049" :xlink:href="getStaticPath('/static/img/map.png')"  transform="matrix(0.49 0 0 0.49 -22.8628 -303)"></image>
          </g>
          <g id="tip">
            <template v-for="item in reservoirList">
              <g v-if="item.pid === '1'">
                <g>
                  <circle style="fill:#FFFFFF;" cx="491.486" cy="-216.623" r="8.413"/>
                  <g>
                    <path style="fill:#00BAFF;" d="M490.299-224.351c0,0,8.693-0.772,9.024,8.279h-15.626c0.284,4.071,3.673,7.286,7.816,7.286
                      c4.328,0,7.837-3.51,7.837-7.838c0-4.329-3.509-7.838-7.837-7.838c-2.493,0-4.712,1.165-6.147,2.979
                      C486.36-222.612,487.906-223.667,490.299-224.351z"/>
                    <path style="fill:#00BAFF;" d="M485.366-221.482c-2.216,2.518-1.69,5.411-1.69,5.411h0.021
                      c-0.013-0.183-0.021-0.366-0.021-0.552C483.676-218.459,484.309-220.147,485.366-221.482z"/>
                  </g>
                </g>
                <g>
                  <path style="fill:#FDFEFF;stroke:#D4D5D7;stroke-miterlimit:10;" d="M599.417-186.021c0,1.756-1.466,3.18-3.274,3.18h-89.74
                    c-1.809,0-3.274-1.424-3.274-3.18v-35.834c0-1.757,1.466-3.181,3.274-3.181h89.74c1.809,0,3.274,1.424,3.274,3.181V-186.021z"/>
                  <text transform="matrix(1 0 0 1 513.4961 -207.7295)" style="font-family:'MicrosoftYaHei'; font-size:10.7932;">河东水厂蓄水池</text>
                  <text transform="matrix(1 0 0 1 517.9424 -191.6675)" style="fill:#666666; font-family:'MicrosoftYaHei'; font-size:9;">水位：341.39m</text>
                </g>
              </g>
              <g v-if="item.pid === '2'">
                <g>
                  <circle style="fill:#FFFFFF;" cx="400.171" cy="-95.746" r="8.413"/>
                  <g>
                    <path style="fill:#00BAFF;" d="M398.984-103.473c0,0,8.693-0.773,9.024,8.279h-15.626c0.284,4.071,3.673,7.286,7.816,7.286
                      c4.328,0,7.837-3.509,7.837-7.838s-3.509-7.838-7.837-7.838c-2.493,0-4.712,1.165-6.147,2.979
                      C395.046-101.735,396.592-102.79,398.984-103.473z"/>
                    <path style="fill:#00BAFF;" d="M394.052-100.605c-2.216,2.518-1.69,5.411-1.69,5.411h0.021
                      c-0.013-0.183-0.021-0.366-0.021-0.552C392.361-97.582,392.994-99.27,394.052-100.605z"/>
                  </g>
                </g>
                <g>
                  <path style="fill:#FDFEFF;stroke:#D4D5D7;stroke-miterlimit:10;" d="M508.103-65.145c0,1.756-1.467,3.181-3.275,3.181h-89.738
                    c-1.809,0-3.275-1.424-3.275-3.181v-35.834c0-1.756,1.467-3.18,3.275-3.18h89.738c1.809,0,3.275,1.424,3.275,3.18V-65.145z"/>
                  <text transform="matrix(1 0 0 1 441.916 -86.8525)" style="font-family:'MicrosoftYaHei'; font-size:10.7932;">清水湖</text>
                  <text transform="matrix(1 0 0 1 426.6279 -70.79)" style="fill:#666666; font-family:'MicrosoftYaHei'; font-size:9;">水位：341.39m</text>
                </g>
              </g>
              <g v-if="item.pid === '3'">
                <g>
                  <circle style="fill:#FFFFFF;" cx="405.171" cy="-50.551" r="8.413"/>
                  <g>
                    <path style="fill:#00BAFF;" d="M403.984-58.278c0,0,8.693-0.772,9.024,8.279h-15.626c0.284,4.071,3.673,7.286,7.816,7.286
                      c4.328,0,7.837-3.51,7.837-7.838c0-4.329-3.509-7.838-7.837-7.838c-2.493,0-4.712,1.165-6.147,2.979
                      C400.046-56.54,401.592-57.595,403.984-58.278z"/>
                    <path style="fill:#00BAFF;" d="M399.052-55.41c-2.216,2.518-1.69,5.411-1.69,5.411h0.021c-0.013-0.183-0.021-0.366-0.021-0.552
                      C397.361-52.387,397.994-54.075,399.052-55.41z"/>
                  </g>
                </g>
                <g>
                  <path style="fill:#FDFEFF;stroke:#D4D5D7;stroke-miterlimit:10;" d="M513.103-19.95c0,1.757-1.467,3.181-3.275,3.181h-89.738
                    c-1.809,0-3.275-1.424-3.275-3.181v-35.833c0-1.757,1.467-3.181,3.275-3.181h89.738c1.809,0,3.275,1.424,3.275,3.181V-19.95z"/>
                  <text transform="matrix(1 0 0 1 435.5059 -41.6572)" style="font-family:'MicrosoftYaHei'; font-size:10.7932;">水洞沟水库</text>
                  <text transform="matrix(1 0 0 1 431.6279 -25.5952)" style="fill:#666666; font-family:'MicrosoftYaHei'; font-size:9;">水位：341.39m</text>
                </g>
              </g>
              <g v-if="item.pid === '4'">
                <g>
                  <circle style="fill:#FFFFFF;" cx="448.764" cy="-3.126" r="8.413"/>
                  <g>
                    <path style="fill:#00BAFF;" d="M447.577-10.854c0,0,8.693-0.772,9.024,8.279h-15.626c0.284,4.071,3.673,7.286,7.816,7.286
                      c4.328,0,7.837-3.51,7.837-7.838c0-4.329-3.509-7.838-7.837-7.838c-2.493,0-4.712,1.165-6.147,2.979
                      C443.639-9.116,445.185-10.17,447.577-10.854z"/>
                    <path style="fill:#00BAFF;" d="M442.645-7.986c-2.216,2.518-1.69,5.411-1.69,5.411h0.021c-0.013-0.183-0.021-0.366-0.021-0.552
                      C440.954-4.962,441.587-6.65,442.645-7.986z"/>
                  </g>
                </g>
                <g>
                  <path style="fill:#FDFEFF;stroke:#D4D5D7;stroke-miterlimit:10;" d="M556.695,27.475c0,1.757-1.467,3.181-3.275,3.181h-89.738
                    c-1.809,0-3.275-1.424-3.275-3.181V-8.359c0-1.757,1.467-3.181,3.275-3.181h89.738c1.809,0,3.275,1.424,3.275,3.181V27.475z"/>
                  <text transform="matrix(1 0 0 1 479.0986 5.7666)" style="font-family:'MicrosoftYaHei'; font-size:10.7932;">鸭子荡水库</text>
                  <text transform="matrix(1 0 0 1 475.2207 21.8286)" style="fill:#666666; font-family:'MicrosoftYaHei'; font-size:9;">水位：341.39m</text>
                </g>
              </g>
              <g v-if="item.pid === '5'">
                <g>
                  <circle style="fill:#FFFFFF;" cx="401.801" cy="134.531" r="8.413"/>
                  <g>
                    <path style="fill:#00BAFF;" d="M400.614,126.803c0,0,8.693-0.772,9.024,8.279h-15.626c0.284,4.071,3.673,7.286,7.816,7.286
                      c4.328,0,7.837-3.51,7.837-7.838c0-4.329-3.509-7.838-7.837-7.838c-2.493,0-4.712,1.165-6.147,2.979
                      C396.676,128.542,398.222,127.487,400.614,126.803z"/>
                    <path style="fill:#00BAFF;" d="M395.682,129.671c-2.216,2.518-1.69,5.411-1.69,5.411h0.021
                      c-0.013-0.183-0.021-0.366-0.021-0.552C393.991,132.695,394.624,131.007,395.682,129.671z"/>
                  </g>
                </g>
                <g>
                  <path style="fill:#FDFEFF;stroke:#D4D5D7;stroke-miterlimit:10;" d="M509.732,165.132c0,1.757-1.467,3.181-3.275,3.181h-89.738
                    c-1.809,0-3.275-1.424-3.275-3.181v-35.833c0-1.757,1.467-3.181,3.275-3.181h89.738c1.809,0,3.275,1.424,3.275,3.181V165.132z"/>
                  <text transform="matrix(1 0 0 1 432.1357 143.4248)" style="font-family:'MicrosoftYaHei'; font-size:10.7932;">刘家沟水库</text>
                  <text transform="matrix(1 0 0 1 428.2578 159.4868)" style="fill:#666666; font-family:'MicrosoftYaHei'; font-size:9;">水位：341.39m</text>
                </g>
              </g>
              <g v-if="item.pid === '6'">
                <g>
                  <circle style="fill:#FFFFFF;" cx="395.66" cy="248.897" r="8.413"/>
                  <g>
                    <path style="fill:#00BAFF;" d="M394.473,241.171c0,0,8.693-0.773,9.024,8.279h-15.626c0.284,4.07,3.673,7.285,7.816,7.285
                      c4.328,0,7.837-3.51,7.837-7.838s-3.509-7.838-7.837-7.838c-2.493,0-4.712,1.166-6.147,2.979
                      C390.534,242.909,392.08,241.854,394.473,241.171z"/>
                    <path style="fill:#00BAFF;" d="M389.54,244.038c-2.216,2.518-1.69,5.412-1.69,5.412h0.021c-0.013-0.184-0.021-0.367-0.021-0.553
                      C387.85,247.062,388.482,245.374,389.54,244.038z"/>
                  </g>
                </g>
                <g>
                  <path style="fill:#FDFEFF;stroke:#D4D5D7;stroke-miterlimit:10;" d="M503.591,279.499c0,1.757-1.467,3.181-3.275,3.181h-89.738
                    c-1.809,0-3.275-1.424-3.275-3.181v-35.834c0-1.756,1.467-3.18,3.275-3.18h89.738c1.809,0,3.275,1.424,3.275,3.18V279.499z"/>
                  <text transform="matrix(1 0 0 1 417.9941 257.791)" style="font-family:'MicrosoftYaHei'; font-size:10.7932;">下马峰调蓄水池</text>
                  <text transform="matrix(1 0 0 1 422.1162 273.8535)" style="fill:#666666; font-family:'MicrosoftYaHei'; font-size:9;">水位：341.39m</text>
                </g>
              </g>
              <g v-if="item.pid === '7'">
                <g>
                  <circle style="fill:#FFFFFF;" cx="327.498" cy="412.968" r="8.413"/>
                  <g>
                    <path style="fill:#00BAFF;" d="M326.311,405.241c0,0,8.693-0.773,9.024,8.279h-15.626c0.284,4.07,3.673,7.285,7.816,7.285
                      c4.328,0,7.837-3.51,7.837-7.838s-3.509-7.838-7.837-7.838c-2.493,0-4.712,1.166-6.147,2.979
                      C322.372,406.979,323.918,405.925,326.311,405.241z"/>
                    <path style="fill:#00BAFF;" d="M321.378,408.108c-2.216,2.518-1.69,5.412-1.69,5.412h0.021
                      c-0.013-0.184-0.021-0.367-0.021-0.553C319.688,411.132,320.32,409.444,321.378,408.108z"/>
                  </g>
                </g>
                <g>
                  <path style="fill:#FDFEFF;stroke:#D4D5D7;stroke-miterlimit:10;" d="M435.429,443.569c0,1.757-1.467,3.181-3.275,3.181h-89.738
                    c-1.809,0-3.275-1.424-3.275-3.181v-35.834c0-1.756,1.467-3.18,3.275-3.18h89.738c1.809,0,3.275,1.424,3.275,3.18V443.569z"/>
                  <text transform="matrix(1 0 0 1 363.832 421.8623)" style="font-family:'MicrosoftYaHei'; font-size:10.7932;">南坪水库</text>
                  <text transform="matrix(1 0 0 1 353.9541 437.9238)" style="fill:#666666; font-family:'MicrosoftYaHei'; font-size:9;">水位：341.39m</text>
                </g>
              </g>
              <g id="pid349f62e00a414c2918d16d8b894d083" v-if="item.pid === '349f62e00a414c2918d16d8b894d083'">
                <g :class="getWarnClass(item.status)">
                  <circle style="fill:#FFFFFF;" cx="350.08" cy="509.968" r="8.413"/>
                  <g>
                    <path style="fill:#00BAFF;" d="M348.893,502.241c0,0,8.693-0.773,9.024,8.279h-15.626c0.284,4.07,3.673,7.285,7.816,7.285
                      c4.328,0,7.837-3.51,7.837-7.838s-3.509-7.838-7.837-7.838c-2.493,0-4.712,1.166-6.147,2.979
                      C344.954,503.979,346.5,502.925,348.893,502.241z"/>
                    <path style="fill:#00BAFF;" d="M343.96,505.108c-2.216,2.518-1.69,5.412-1.69,5.412h0.021c-0.013-0.184-0.021-0.367-0.021-0.553
                      C342.27,508.132,342.902,506.444,343.96,505.108z"/>
                  </g>
                </g>
                <g>
                  <path style="fill:#FDFEFF;stroke:#D4D5D7;stroke-miterlimit:10;" d="M458.011,540.569c0,1.757-1.467,3.181-3.275,3.181h-89.738
                    c-1.809,0-3.275-1.424-3.275-3.181v-35.834c0-1.756,1.467-3.18,3.275-3.18h89.738c1.809,0,3.275,1.424,3.275,3.18V540.569z"/>
                  <text transform="matrix(1 0 0 1 386.4141 518.8623)" style="font-family:'MicrosoftYaHei'; font-size:10.7932;">中庄水库</text>
                  <text transform="matrix(1 0 0 1 376.5361 534.9238)" style="fill:#666666; font-family:'MicrosoftYaHei'; font-size:9;">水位：{{item.z}}m</text>
                </g>
              </g>
              <g v-if="item.pid === '9'">
                <g>
                  <circle style="fill:#FFFFFF;" cx="355.113" cy="556.336" r="8.413"/>
                  <g>
                    <path style="fill:#00BAFF;" d="M353.926,548.609c0,0,8.693-0.773,9.024,8.279h-15.626c0.284,4.07,3.673,7.285,7.816,7.285
                      c4.328,0,7.837-3.51,7.837-7.838s-3.509-7.838-7.837-7.838c-2.493,0-4.712,1.166-6.147,2.979
                      C349.987,550.348,351.533,549.293,353.926,548.609z"/>
                    <path style="fill:#00BAFF;" d="M348.993,551.477c-2.216,2.518-1.69,5.412-1.69,5.412h0.021
                      c-0.013-0.184-0.021-0.367-0.021-0.553C347.303,554.5,347.936,552.813,348.993,551.477z"/>
                  </g>
                </g>
                <g>
                  <path style="fill:#FDFEFF;stroke:#D4D5D7;stroke-miterlimit:10;" d="M463.044,586.938c0,1.757-1.467,3.181-3.275,3.181H370.03
                    c-1.809,0-3.275-1.424-3.275-3.181v-35.834c0-1.756,1.467-3.18,3.275-3.18h89.738c1.809,0,3.275,1.424,3.275,3.18V586.938z"/>
                  <text transform="matrix(1 0 0 1 388.4473 565.2295)" style="font-family:'MicrosoftYaHei'; font-size:10.7932;">贺家湾水库</text>
                  <text transform="matrix(1 0 0 1 381.5693 581.291)" style="fill:#666666; font-family:'MicrosoftYaHei'; font-size:9;">水位：341.39m</text>
                </g>
              </g>
              <g v-if="item.pid === '10'">
                <g>
                  <path style="fill:#FDFEFF;stroke:#D4D5D7;stroke-miterlimit:10;" d="M371.182,302.599c0,1.756-1.467,3.18-3.275,3.18h-89.739
                    c-1.809,0-3.274-1.424-3.274-3.18v-35.834c0-1.758,1.466-3.182,3.274-3.182h89.739c1.809,0,3.275,1.424,3.275,3.182V302.599z"/>
                  <text transform="matrix(1 0 0 1 285.585 280.8896)" style="font-family:'MicrosoftYaHei'; font-size:10.7932;">上马峰调蓄水池</text>
                  <text transform="matrix(1 0 0 1 289.707 296.9521)" style="fill:#666666; font-family:'MicrosoftYaHei'; font-size:9;">水位：341.39m</text>
                </g>
                <g>
                  <circle style="fill:#FFFFFF;" cx="382.594" cy="271.996" r="8.413"/>
                  <g>
                    <path style="fill:#00BAFF;" d="M381.407,264.27c0,0,8.693-0.773,9.024,8.279h-15.626c0.284,4.07,3.673,7.285,7.816,7.285
                      c4.328,0,7.837-3.509,7.837-7.838c0-4.328-3.509-7.837-7.837-7.837c-2.493,0-4.712,1.164-6.147,2.978
                      C377.469,266.008,379.015,264.953,381.407,264.27z"/>
                    <path style="fill:#00BAFF;" d="M376.475,267.137c-2.216,2.519-1.69,5.412-1.69,5.412h0.021
                      c-0.013-0.184-0.021-0.366-0.021-0.553C374.784,270.16,375.417,268.473,376.475,267.137z"/>
                  </g>
                </g>
              </g>
              <g v-if="item.pid === '11'">
                <g>
                  <path style="fill:#FDFEFF;stroke:#D4D5D7;stroke-miterlimit:10;" d="M295.03,540.724c0,1.756-1.467,3.18-3.275,3.18h-89.739
                    c-1.809,0-3.274-1.424-3.274-3.18V504.89c0-1.758,1.466-3.182,3.274-3.182h89.739c1.809,0,3.275,1.424,3.275,3.182V540.724z"/>
                  <text transform="matrix(1 0 0 1 218.4331 519.0146)" style="font-family:'MicrosoftYaHei'; font-size:10.7932;">海子峡水库</text>
                  <text transform="matrix(1 0 0 1 213.5552 535.0771)" style="fill:#666666; font-family:'MicrosoftYaHei'; font-size:9;">水位：341.39m</text>
                </g>
                <g>
                  <circle style="fill:#FFFFFF;" cx="306.443" cy="510.121" r="8.413"/>
                  <g>
                    <path style="fill:#00BAFF;" d="M305.255,502.395c0,0,8.694-0.773,9.024,8.279h-15.625c0.284,4.07,3.673,7.285,7.816,7.285
                      c4.329,0,7.836-3.509,7.836-7.838c0-4.328-3.508-7.837-7.836-7.837c-2.493,0-4.712,1.164-6.147,2.978
                      C301.317,504.133,302.863,503.078,305.255,502.395z"/>
                    <path style="fill:#00BAFF;" d="M300.323,505.262c-2.216,2.519-1.69,5.412-1.69,5.412h0.021
                      c-0.013-0.184-0.021-0.366-0.021-0.553C298.632,508.285,299.265,506.598,300.323,505.262z"/>
                  </g>
                </g>
              </g>
              <g v-if="item.pid === '12'">
                <g>
                  <path style="fill:#FDFEFF;stroke:#D4D5D7;stroke-miterlimit:10;" d="M318.025,179.404c0,1.756-1.467,3.18-3.275,3.18h-89.739
                    c-1.809,0-3.274-1.424-3.274-3.18V143.57c0-1.758,1.466-3.182,3.274-3.182h89.739c1.809,0,3.275,1.424,3.275,3.182V179.404z"/>
                  <text transform="matrix(1 0 0 1 241.4292 157.6953)" style="font-family:'MicrosoftYaHei'; font-size:10.7932;">鲁家窑水库</text>
                  <text transform="matrix(1 0 0 1 236.5513 173.7578)" style="fill:#666666; font-family:'MicrosoftYaHei'; font-size:9;">水位：341.39m</text>
                </g>
                <g>
                  <circle style="fill:#FFFFFF;" cx="329.438" cy="148.802" r="8.413"/>
                  <g>
                    <path style="fill:#00BAFF;" d="M328.252,141.075c0,0,8.693-0.773,9.023,8.279H321.65c0.283,4.07,3.672,7.285,7.816,7.285
                      c4.328,0,7.836-3.509,7.836-7.838c0-4.328-3.508-7.837-7.836-7.837c-2.494,0-4.713,1.164-6.148,2.978
                      C324.313,142.813,325.859,141.759,328.252,141.075z"/>
                    <path style="fill:#00BAFF;" d="M323.318,143.942c-2.215,2.519-1.689,5.412-1.689,5.412h0.021
                      c-0.014-0.184-0.021-0.366-0.021-0.553C321.629,146.966,322.262,145.278,323.318,143.942z"/>
                  </g>
                </g>
              </g>
              <g v-if="item.pid === '13'">
                <g>
                  <path style="fill:#FDFEFF;stroke:#D4D5D7;stroke-miterlimit:10;" d="M378.371,251.686c0,1.756-1.467,3.18-3.275,3.18h-89.739
                    c-1.809,0-3.274-1.424-3.274-3.18v-35.834c0-1.758,1.466-3.182,3.274-3.182h89.739c1.809,0,3.275,1.424,3.275,3.182V251.686z"/>
                  <text transform="matrix(1 0 0 1 301.7749 229.9766)" style="font-family:'MicrosoftYaHei'; font-size:10.7932;">小西沟蓄水池</text>
                  <text transform="matrix(1 0 0 1 296.897 246.0391)" style="fill:#666666; font-family:'MicrosoftYaHei'; font-size:9;">水位：341.39m</text>
                </g>
                <g>
                  <circle style="fill:#FFFFFF;" cx="389.784" cy="221.083" r="8.413"/>
                  <g>
                    <path style="fill:#00BAFF;" d="M388.598,213.356c0,0,8.693-0.773,9.023,8.279h-15.625c0.283,4.07,3.672,7.285,7.816,7.285
                      c4.328,0,7.836-3.509,7.836-7.838c0-4.328-3.508-7.837-7.836-7.837c-2.494,0-4.713,1.164-6.148,2.978
                      C384.658,215.095,386.205,214.04,388.598,213.356z"/>
                    <path style="fill:#00BAFF;" d="M383.664,216.224c-2.215,2.519-1.689,5.412-1.689,5.412h0.021
                      c-0.014-0.184-0.021-0.366-0.021-0.553C381.975,219.247,382.607,217.56,383.664,216.224z"/>
                  </g>
                </g>
              </g>
              <g v-if="item.pid === '14'">
                <g>
                  <path style="fill:#FDFEFF;stroke:#D4D5D7;stroke-miterlimit:10;" d="M336.261,107.731c0,1.756-1.467,3.18-3.275,3.18h-89.739
                    c-1.809,0-3.274-1.424-3.274-3.18V71.897c0-1.758,1.466-3.182,3.274-3.182h89.739c1.809,0,3.275,1.424,3.275,3.182V107.731z"/>
                  <text transform="matrix(1 0 0 1 257.6646 86.0215)" style="font-family:'MicrosoftYaHei'; font-size:10.7932;">金积调蓄水池</text>
                  <text transform="matrix(1 0 0 1 254.7866 102.084)" style="fill:#666666; font-family:'MicrosoftYaHei'; font-size:9;">水位：341.39m</text>
                </g>
                <g>
                  <circle style="fill:#FFFFFF;" cx="347.674" cy="77.128" r="8.413"/>
                  <g>
                    <path style="fill:#00BAFF;" d="M346.487,69.402c0,0,8.693-0.773,9.023,8.279h-15.625c0.283,4.07,3.672,7.285,7.816,7.285
                      c4.328,0,7.836-3.509,7.836-7.838c0-4.328-3.508-7.837-7.836-7.837c-2.494,0-4.713,1.164-6.148,2.978
                      C342.548,71.14,344.095,70.085,346.487,69.402z"/>
                    <path style="fill:#00BAFF;" d="M341.554,72.269c-2.215,2.519-1.689,5.412-1.689,5.412h0.021
                      c-0.014-0.184-0.021-0.366-0.021-0.553C339.864,75.292,340.497,73.605,341.554,72.269z"/>
                  </g>
                </g>
              </g>
              <g v-if="item.pid === '15'">
                <g>
                  <path style="fill:#FDFEFF;stroke:#D4D5D7;stroke-miterlimit:10;" d="M314.723,618.308c0,1.756-1.467,3.18-3.275,3.18h-89.74
                    c-1.809,0-3.274-1.424-3.274-3.18v-35.834c0-1.758,1.466-3.182,3.274-3.182h89.74c1.809,0,3.275,1.424,3.275,3.182V618.308z"/>
                  <text transform="matrix(1 0 0 1 244.1255 596.5986)" style="font-family:'MicrosoftYaHei'; font-size:10.7932;">秦家沟水库</text>
                  <text transform="matrix(1 0 0 1 233.2476 612.6611)" style="fill:#666666; font-family:'MicrosoftYaHei'; font-size:9;">水位：341.39m</text>
                </g>
                <g>
                  <circle style="fill:#FFFFFF;" cx="326.135" cy="587.705" r="8.413"/>
                  <g>
                    <path style="fill:#00BAFF;" d="M324.947,579.979c0,0,8.694-0.773,9.024,8.279h-15.626c0.285,4.07,3.674,7.285,7.816,7.285
                      c4.329,0,7.837-3.509,7.837-7.838c0-4.328-3.508-7.837-7.837-7.837c-2.492,0-4.711,1.164-6.146,2.978
                      C321.01,581.717,322.555,580.662,324.947,579.979z"/>
                    <path style="fill:#00BAFF;" d="M320.016,582.846c-2.217,2.519-1.691,5.412-1.691,5.412h0.021
                      c-0.012-0.184-0.021-0.366-0.021-0.553C318.324,585.869,318.957,584.182,320.016,582.846z"/>
                  </g>
                </g>
              </g>
              <g v-if="item.pid === '16'">
                <g>
                  <path style="fill:#FDFEFF;stroke:#D4D5D7;stroke-miterlimit:10;" d="M335.262,675.308c0,1.756-1.467,3.18-3.275,3.18h-89.74
                    c-1.809,0-3.274-1.424-3.274-3.18v-35.834c0-1.758,1.466-3.182,3.274-3.182h89.74c1.809,0,3.275,1.424,3.275,3.182V675.308z"/>
                  <text transform="matrix(1 0 0 1 264.6646 653.5986)" style="font-family:'MicrosoftYaHei'; font-size:10.7932;">龙潭水库</text>
                  <text transform="matrix(1 0 0 1 253.7866 669.6611)" style="fill:#666666; font-family:'MicrosoftYaHei'; font-size:9;">水位：341.39m</text>
                </g>
                <g>
                  <circle style="fill:#FFFFFF;" cx="346.674" cy="644.705" r="8.413"/>
                  <g>
                    <path style="fill:#00BAFF;" d="M345.486,636.979c0,0,8.694-0.773,9.024,8.279h-15.626c0.285,4.07,3.674,7.285,7.816,7.285
                      c4.329,0,7.837-3.509,7.837-7.838c0-4.328-3.508-7.837-7.837-7.837c-2.492,0-4.711,1.164-6.146,2.978
                      C341.549,638.717,343.094,637.662,345.486,636.979z"/>
                    <path style="fill:#00BAFF;" d="M340.555,639.846c-2.217,2.519-1.691,5.412-1.691,5.412h0.021
                      c-0.012-0.184-0.021-0.366-0.021-0.553C338.863,642.869,339.496,641.182,340.555,639.846z"/>
                  </g>
                </g>
              </g>
            </template>
          </g>
        </svg>
      </div>
    </div>
    <div class="legend">
      <span class="item">
        <span class="c-00baff"><i class="nxst-warn"></i></span>
        <span>正常</span>
      </span>
      <span class="item">
        <span class="c-red" :class="getFooterWarn()"><i class="nxst-warn"></i></span>
        <span>报警</span>
      </span>
    </div>
    <div class="scale">
      <span class="minus" @click="handleMinus"><i class="nxst-minus"></i></span>
      <span class="plus" @click="handlePlus"><i class="nxst-add"></i></span>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import {mapGetters, mapMutations} from 'vuex'
import {getStaticPath} from '@/assets/js/mixin'
export default {
  name: 'NMap',
  props: {
    step: {
      type: Number,
      default: 0.5
    }
  },
  mixins: [getStaticPath],
  data() {
    return {
      scale: 1
    }
  },
  computed: {
    ...mapGetters(['reservoirList']),
    getScale() {
      return {
        'transform': `scale(${this.scale}) translate(0, 0)`,
        '-webkit-transfrom': `scale(${this.scale}) translate(0, 0)`
      }
    }
  },
  methods: {
    getWarnClass(status) {
      return status ? 'warn' : ''
    },
    getFooterWarn() {
      let len = this.reservoirList.length,
          res = ''
      for (let i = 0; i < len; i++) {
        if (this.reservoirList[i].status) {
          res = 'animated infinite fadeIn'
          break
        }
      }
      return res
    },
    start(e) {
      this.touch.initiated = true
      this.touch.startY = e.touches[0].pageY
      this.touch.startX = e.touches[0].pageX

      let style = this.$refs.mapTransform.style.transform
      let arr = style.match(/(\-|\+)?\d+(\.\d+)?px/g)
      if (arr && arr.length) {
        this.oldX = parseFloat(arr[0])
        this.oldY = parseFloat(arr[1])
      }
    },
    move(e) {
      if (!this.touch.initiated) {
        return
      }

      let deltaY = e.touches[0].pageY - this.touch.startY,
          deltaX = e.touches[0].pageX - this.touch.startX

        this.$refs.mapTransform.style.transition = 'none'
        this.$refs.mapTransform.style.transform = `scale(${this.scale}) translate(${deltaX + this.oldX}px, ${deltaY + this.oldY}px)`

    },
    end() {
      this.touch.initiated = false

      this.$refs.mapTransform.style.transition = 'all 0.4s'
    },
    handleMinus() {
      this.scale -= this.step
      if (this.scale < 1) {
        this.scale = 1
      }
    },
    handlePlus() {
      this.scale += this.step
      if (this.scale > 3) {
        this.scale = 3
      }
    },
    tipToTop() {
      let $tip = $('#tip'),
          _this = this
      $tip.on('click', '> g', function() {
        let $this = $(this),
            pid = $this.attr('id').substr(3)
            _this.$router.push({path: '/reservoirDetail', query: {pid}})
      })
    }
  },
  mounted() {
    this.tipToTop()
  },
  created() {
    this.touch = {}
  }
}
</script>

<style scoped lang="less">
  @import '../../../assets/less/variable.less';
  .NMap {
    .mapWrap {
      position: absolute;
      top: @tab-height;
      bottom: 0;
      width: 100%;
      overflow: hidden;
      padding-top: 10px;
      .mapTransform {
        transition: all 0.4s;
      }
      svg {
        width: 100%;
        height: 100%;
      }
      .warn {
        animation-name: fadeIn;
        animation-duration: 0.4s;
        animation-fill-mode: both;
        animation-iteration-count: infinite;

        //transform: scale(1.5) translate(-120px, -168px);
        path {
          fill: red!important;
        }
      }
      .warn + g {
        text[style*="9px"] {
          fill: red!important;
        }
      }
    }
    .legend {
      position: absolute;
      bottom: 10px;
      left: 10px;
      background-color: white;
      border-radius: 4px;
      border: 1px solid #d4d4d4;
      filter: drop-shadow(-1px 1px 2px rgba(0, 0, 0, 0.3));
      .item {
        display: inline-block;
        font-size: 12px;
        padding: 4px 10px;
        > span {
          vertical-align: middle;
        }
      }
    }
    .scale {
      position: absolute;
      right: 10px;
      bottom: 10px;
      display: inline-flex;
      filter: drop-shadow(-1px 1px 2px rgba(0, 0, 0, 0.3));
      .minus, .plus {
        display: inline-block;
        background-color: white;
        width: 40px;
        line-height: 28px;
        text-align: center;
        border: 1px solid #d4d4d4;
        &:active {
          background-color: #bdf1ff;
        }
      } 
      .minus {
        border-right: none;
        border-radius: 4px 0 0 4px;
      }
      .plus {
        border-left: none;
        border-radius: 0 4px 4px 0;
      }
    }
  }
</style>