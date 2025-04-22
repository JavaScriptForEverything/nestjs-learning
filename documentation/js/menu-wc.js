'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">my-app documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AppModule-d24f42bf655b459eac728bbc7999be6c79b65b3877b1b552a8f43af44447ef2da73419c6911d03f3382c47004b4ed9ebb20b8ccbf9a222b76269ea9c802bdcf7"' : 'data-bs-target="#xs-controllers-links-module-AppModule-d24f42bf655b459eac728bbc7999be6c79b65b3877b1b552a8f43af44447ef2da73419c6911d03f3382c47004b4ed9ebb20b8ccbf9a222b76269ea9c802bdcf7"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-d24f42bf655b459eac728bbc7999be6c79b65b3877b1b552a8f43af44447ef2da73419c6911d03f3382c47004b4ed9ebb20b8ccbf9a222b76269ea9c802bdcf7"' :
                                            'id="xs-controllers-links-module-AppModule-d24f42bf655b459eac728bbc7999be6c79b65b3877b1b552a8f43af44447ef2da73419c6911d03f3382c47004b4ed9ebb20b8ccbf9a222b76269ea9c802bdcf7"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AppModule-d24f42bf655b459eac728bbc7999be6c79b65b3877b1b552a8f43af44447ef2da73419c6911d03f3382c47004b4ed9ebb20b8ccbf9a222b76269ea9c802bdcf7"' : 'data-bs-target="#xs-injectables-links-module-AppModule-d24f42bf655b459eac728bbc7999be6c79b65b3877b1b552a8f43af44447ef2da73419c6911d03f3382c47004b4ed9ebb20b8ccbf9a222b76269ea9c802bdcf7"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-d24f42bf655b459eac728bbc7999be6c79b65b3877b1b552a8f43af44447ef2da73419c6911d03f3382c47004b4ed9ebb20b8ccbf9a222b76269ea9c802bdcf7"' :
                                        'id="xs-injectables-links-module-AppModule-d24f42bf655b459eac728bbc7999be6c79b65b3877b1b552a8f43af44447ef2da73419c6911d03f3382c47004b4ed9ebb20b8ccbf9a222b76269ea9c802bdcf7"' }>
                                        <li class="link">
                                            <a href="injectables/AppService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AuthModule-4dbe96347f4e63926d2503b13ead025611eb4cfec44cab1a596529265df86d0339fcfba0f9c5ee5d4c215da4978652fe6bd76e4f03541a9bb97d6794a69dcb77"' : 'data-bs-target="#xs-controllers-links-module-AuthModule-4dbe96347f4e63926d2503b13ead025611eb4cfec44cab1a596529265df86d0339fcfba0f9c5ee5d4c215da4978652fe6bd76e4f03541a9bb97d6794a69dcb77"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-4dbe96347f4e63926d2503b13ead025611eb4cfec44cab1a596529265df86d0339fcfba0f9c5ee5d4c215da4978652fe6bd76e4f03541a9bb97d6794a69dcb77"' :
                                            'id="xs-controllers-links-module-AuthModule-4dbe96347f4e63926d2503b13ead025611eb4cfec44cab1a596529265df86d0339fcfba0f9c5ee5d4c215da4978652fe6bd76e4f03541a9bb97d6794a69dcb77"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AuthModule-4dbe96347f4e63926d2503b13ead025611eb4cfec44cab1a596529265df86d0339fcfba0f9c5ee5d4c215da4978652fe6bd76e4f03541a9bb97d6794a69dcb77"' : 'data-bs-target="#xs-injectables-links-module-AuthModule-4dbe96347f4e63926d2503b13ead025611eb4cfec44cab1a596529265df86d0339fcfba0f9c5ee5d4c215da4978652fe6bd76e4f03541a9bb97d6794a69dcb77"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-4dbe96347f4e63926d2503b13ead025611eb4cfec44cab1a596529265df86d0339fcfba0f9c5ee5d4c215da4978652fe6bd76e4f03541a9bb97d6794a69dcb77"' :
                                        'id="xs-injectables-links-module-AuthModule-4dbe96347f4e63926d2503b13ead025611eb4cfec44cab1a596529265df86d0339fcfba0f9c5ee5d4c215da4978652fe6bd76e4f03541a9bb97d6794a69dcb77"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/PostsModule.html" data-type="entity-link" >PostsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-PostsModule-7ccabb597982939ceed54aef313fd6fb113c11b3dbb28dee4ab26d2933a872dd5a994dd044915482ccc626bbfe7ac08c7620ca544076071bf9613965432ea448"' : 'data-bs-target="#xs-controllers-links-module-PostsModule-7ccabb597982939ceed54aef313fd6fb113c11b3dbb28dee4ab26d2933a872dd5a994dd044915482ccc626bbfe7ac08c7620ca544076071bf9613965432ea448"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-PostsModule-7ccabb597982939ceed54aef313fd6fb113c11b3dbb28dee4ab26d2933a872dd5a994dd044915482ccc626bbfe7ac08c7620ca544076071bf9613965432ea448"' :
                                            'id="xs-controllers-links-module-PostsModule-7ccabb597982939ceed54aef313fd6fb113c11b3dbb28dee4ab26d2933a872dd5a994dd044915482ccc626bbfe7ac08c7620ca544076071bf9613965432ea448"' }>
                                            <li class="link">
                                                <a href="controllers/PostsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PostsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-PostsModule-7ccabb597982939ceed54aef313fd6fb113c11b3dbb28dee4ab26d2933a872dd5a994dd044915482ccc626bbfe7ac08c7620ca544076071bf9613965432ea448"' : 'data-bs-target="#xs-injectables-links-module-PostsModule-7ccabb597982939ceed54aef313fd6fb113c11b3dbb28dee4ab26d2933a872dd5a994dd044915482ccc626bbfe7ac08c7620ca544076071bf9613965432ea448"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PostsModule-7ccabb597982939ceed54aef313fd6fb113c11b3dbb28dee4ab26d2933a872dd5a994dd044915482ccc626bbfe7ac08c7620ca544076071bf9613965432ea448"' :
                                        'id="xs-injectables-links-module-PostsModule-7ccabb597982939ceed54aef313fd6fb113c11b3dbb28dee4ab26d2933a872dd5a994dd044915482ccc626bbfe7ac08c7620ca544076071bf9613965432ea448"' }>
                                        <li class="link">
                                            <a href="injectables/PostService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PostService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UsersModule.html" data-type="entity-link" >UsersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-UsersModule-e11a21e7bbecfdc3d302d94a6ca5851966f5b1de0bfc93ff369e766c7dafc1276c4d3be356062e5c1d98f2160dae2452b27b8f2220d19164534f916f379afe07"' : 'data-bs-target="#xs-controllers-links-module-UsersModule-e11a21e7bbecfdc3d302d94a6ca5851966f5b1de0bfc93ff369e766c7dafc1276c4d3be356062e5c1d98f2160dae2452b27b8f2220d19164534f916f379afe07"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UsersModule-e11a21e7bbecfdc3d302d94a6ca5851966f5b1de0bfc93ff369e766c7dafc1276c4d3be356062e5c1d98f2160dae2452b27b8f2220d19164534f916f379afe07"' :
                                            'id="xs-controllers-links-module-UsersModule-e11a21e7bbecfdc3d302d94a6ca5851966f5b1de0bfc93ff369e766c7dafc1276c4d3be356062e5c1d98f2160dae2452b27b8f2220d19164534f916f379afe07"' }>
                                            <li class="link">
                                                <a href="controllers/UsersController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-UsersModule-e11a21e7bbecfdc3d302d94a6ca5851966f5b1de0bfc93ff369e766c7dafc1276c4d3be356062e5c1d98f2160dae2452b27b8f2220d19164534f916f379afe07"' : 'data-bs-target="#xs-injectables-links-module-UsersModule-e11a21e7bbecfdc3d302d94a6ca5851966f5b1de0bfc93ff369e766c7dafc1276c4d3be356062e5c1d98f2160dae2452b27b8f2220d19164534f916f379afe07"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UsersModule-e11a21e7bbecfdc3d302d94a6ca5851966f5b1de0bfc93ff369e766c7dafc1276c4d3be356062e5c1d98f2160dae2452b27b8f2220d19164534f916f379afe07"' :
                                        'id="xs-injectables-links-module-UsersModule-e11a21e7bbecfdc3d302d94a6ca5851966f5b1de0bfc93ff369e766c7dafc1276c4d3be356062e5c1d98f2160dae2452b27b8f2220d19164534f916f379afe07"' }>
                                        <li class="link">
                                            <a href="injectables/UserService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/CreatePostBodyDTO.html" data-type="entity-link" >CreatePostBodyDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateUserDto.html" data-type="entity-link" >CreateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/PostBodyMetaOptionDTO.html" data-type="entity-link" >PostBodyMetaOptionDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdatePostBodyDto.html" data-type="entity-link" >UpdatePostBodyDto</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});