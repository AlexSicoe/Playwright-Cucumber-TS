const tags = process.env.npm_config_tags || '';

const clients = [
    'A',
    'B',
    'C'
];

const commonConfig = {
    formatOptions: {
        snippetInterface: 'async-await'
    },
    paths: [
        'src/test/features/**/*'
    ],
    publishQuiet: true,
    dryRun: false,
    require: [
        'src/test/steps/**/*.ts',
        'src/hooks/hooks.ts'
    ],
    requireModule: [
        'ts-node/register'
    ],
    format: [
        'progress-bar',
        'html:test-results/cucumber-report.html',
        'json:test-results/cucumber-report.json',
        'rerun:@rerun.txt'
    ],
    timeout: 2 * 60 * 1000,
    parallel: 12,
};


module.exports = {
    default: {
        ...commonConfig,
        tags: tags,
    },
    focus: {
        ...commonConfig,
        tags: `${tags ? `@focus and (${tags})` : '@focus'}`
    },
    debug: {
        ...commonConfig,
        tags: `${tags ? `@debug and (${tags})` : '@debug'}`,
        parallel: 1,
    },
    rerun: {
        ...commonConfig,
        paths: [],
    },
    "debug:rerun": {
        ...commonConfig,
        paths: [],
        parallel: 1,
    },
    ...createClientProfiles(commonConfig, tags)
}

function getClientTags(client) {
    const clientTag = `@client:${client}`;
    const otherClientTags = clients
        .filter(c => c !== client)
        .map(c => `@client:${c}`)
        .join(' or ');

    return `${clientTag} or not (${otherClientTags})`;
}


function createClientProfiles(commonConfig, tags) {
    const clientProfiles = {};

    for (const client of clients) {
        const clientTags = [tags, getClientTags(client)].filter(Boolean).join(' and ');
        // console.log('clientTags:', clientTags)

        clientProfiles[`client:${client}`] = {
            ...commonConfig,
            tags: `not @ignore and (${clientTags})`
        };

        clientProfiles[`focus:client:${client}`] = {
            ...commonConfig,
            tags: `@focus and (not @ignore and (${clientTags}))`
        };

        clientProfiles[`debug:client:${client}`] = {
            ...commonConfig,
            tags: `@debug and (not @ignore and (${clientTags}))`
        };
    }

    return clientProfiles;
}