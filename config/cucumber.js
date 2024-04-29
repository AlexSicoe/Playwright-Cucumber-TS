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
    only: {
        ...commonConfig,
        tags: `${tags ? `@only and (${tags})` : '@only'}`
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
            tags: `not @skip and (${clientTags})`
        };

        clientProfiles[`only:client:${client}`] = {
            ...commonConfig,
            tags: `@only and (not @skip and (${clientTags}))`
        };

        clientProfiles[`debug:client:${client}`] = {
            ...commonConfig,
            tags: `@debug and (not @skip and (${clientTags}))`
        };
    }

    return clientProfiles;
}