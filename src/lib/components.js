import DynamicPrivacySettingsManager from "@/components/privacySettingsManager";

export const REACTMARKDOWNCOMPONENTS = {
  p: ({ children }) =>
    children[0] === "<<PRIVACY_MANAGER>>" ? (
      <DynamicPrivacySettingsManager />
    ) : (
      <p>{children}</p>
    ),
  a: ({ href, children }) => (
    <a
      href={href}
      className="text-blue-primary"
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  ),
  ul: ({ children }) => <ul className="my-2 list-disc pl-4">{children}</ul>,
  img: ({ src, alt }) => {
    let width = alt.split("|")[1];
    return <img src={src} width={width ? width : 300} alt={alt[0]} className="block mx-auto py-4" />;
  },
};
